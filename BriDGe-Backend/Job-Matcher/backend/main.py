import os
import io
import asyncio
from typing import List
from fastapi import FastAPI, File, UploadFile, Depends, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import PyPDF2

from database import engine, Base, get_db, ResumeDB, JobDB, MatchDB
from models.schemas import ResumeParseResult, JobMatchResponse
from ai.gemini import parse_resume, match_job, calculate_hybrid_score
from scraper.duckduckgo import search_jobs_on_ddg_async, generate_search_queries
from scraper.job_scraper import scrape_job_page_async

app = FastAPI(title="Job Matcher API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    pdf_file = io.BytesIO(file_bytes)
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text() + "\n"
    return text

async def process_and_match_jobs_async(resume_id: int, db: Session):
    # Fetch resume
    resume = db.query(ResumeDB).filter(ResumeDB.id == resume_id).first()
    if not resume:
        print(f"Resume {resume_id} not found.")
        return

    parsed_resume = {
        "skills": resume.skills,
        "experience_level": resume.experience_level,
        "preferred_roles": resume.preferred_roles,
        "tools": resume.tools,
        "education": resume.education
    }

    # Generate queries
    queries = generate_search_queries(parsed_resume)
    
    # Async Scrape DDG
    print("Searching DuckDuckGo...")
    job_links = []
    for q in queries:
        results = await search_jobs_on_ddg_async(q, max_results=10)
        for r in results:
            job_links.append(r["url"])
        await asyncio.sleep(2) # Prevent rate limiting
            
    # Deduplicate links and normalize
    unique_links = list(set(job_links))
    print(f"Found {len(unique_links)} unique job links.")
    
    # Filter out previously scraped/matched jobs to save time
    existing_urls = {job.url for job in db.query(JobDB.url).filter(JobDB.url.in_(unique_links)).all()}
    links_to_scrape = [link for link in unique_links if link not in existing_urls][:20] # Limit to 20 for speed
    
    # Async Scrape Jobs
    print(f"Scraping {len(links_to_scrape)} new job pages...")
    scrape_tasks = [scrape_job_page_async(url) for url in links_to_scrape]
    scraped_jobs = await asyncio.gather(*scrape_tasks)
    
    # Save new jobs
    valid_jobs = []
    for job_data in scraped_jobs:
        if not job_data["description"] or job_data["title"] == "Error Scraping":
            continue
            
        new_job = JobDB(
            title=job_data["title"],
            company=job_data["company"],
            description=job_data["description"],
            url=job_data["url"],
            source="DuckDuckGo"
        )
        db.add(new_job)
        valid_jobs.append(new_job)
        
    db.commit()
    
    # Now gather all jobs to match (newly scraped + existing)
    all_jobs_to_match = db.query(JobDB).filter(JobDB.url.in_(unique_links[:10])).all()
    
    print(f"Matching {len(all_jobs_to_match)} jobs with AI...")
    for job in all_jobs_to_match:
        # Check if already matched
        existing_match = db.query(MatchDB).filter(MatchDB.resume_id == resume.id, MatchDB.job_id == job.id).first()
        if existing_match:
            continue
            
        # Match with Gemini
        match_result = match_job(parsed_resume, job.description)
        
        # Calculate Hybrid Score
        ai_score = match_result.get("ai_score", 0)
        final_score = calculate_hybrid_score(ai_score, parsed_resume, job.description)
        
        # Save match
        new_match = MatchDB(
            resume_id=resume.id,
            job_id=job.id,
            match_score=final_score,
            missing_skills=match_result.get("missing_skills", []),
            reasoning=match_result.get("reasoning", "")
        )
        db.add(new_match)
        
    db.commit()
    print("Matching complete.")

def run_process_in_background(resume_id: int, db: Session):
    """Wrapper to run async function in background task safely."""
    asyncio.run(process_and_match_jobs_async(resume_id, db))

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf") and not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")
        
    contents = await file.read()
    
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(contents)
    else:
        text = contents.decode("utf-8")
        
    # Parse with Gemini
    parsed_data = parse_resume(text)
    
    # Save to DB
    new_resume = ResumeDB(
        filename=file.filename,
        skills=parsed_data.get("skills", []),
        experience_level=parsed_data.get("experience_level", ""),
        preferred_roles=parsed_data.get("preferred_roles", []),
        tools=parsed_data.get("tools", []),
        education=parsed_data.get("education", []),
        raw_text=text
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    
    return {"message": "Resume uploaded successfully", "resume_id": new_resume.id, "parsed_data": parsed_data}

@app.post("/match/{resume_id}")
async def trigger_match(resume_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    resume = db.query(ResumeDB).filter(ResumeDB.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    background_tasks.add_task(run_process_in_background, resume_id, db)
    return {"message": "Matching process started in the background."}

@app.get("/jobs/{resume_id}", response_model=List[JobMatchResponse])
async def get_jobs(resume_id: int, db: Session = Depends(get_db)):
    # Fetch matched jobs and filter out low scores (< 30) for better quality
    matches = db.query(MatchDB, JobDB).join(JobDB, MatchDB.job_id == JobDB.id)\
        .filter(MatchDB.resume_id == resume_id, MatchDB.match_score >= 30)\
        .order_by(MatchDB.match_score.desc()).all()
    
    results = []
    for match, job in matches:
        results.append(JobMatchResponse(
            job_id=job.id,
            title=job.title,
            company=job.company,
            url=job.url,
            match_score=match.match_score,
            missing_skills=match.missing_skills,
            reasoning=match.reasoning
        ))
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
