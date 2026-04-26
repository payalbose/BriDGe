from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from parsers import parse_pdf, parse_docx, chunk_text
from extraction import extract_skills_spacy
from gap_detection import detect_skill_gaps
from retrieval import retriever
from llm import query_llm_for_analysis
from models import AnalysisResponse

app = FastAPI(title="AI Career Intelligence Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow frontend to communicate
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume_jd(
    resume_file: UploadFile = File(...),
    job_description_file: UploadFile = File(...)
):
    # 1. Parse Resume
    resume_bytes = await resume_file.read()
    resume_filename = resume_file.filename.lower()
    
    if resume_filename.endswith('.pdf'):
        resume_text = parse_pdf(resume_bytes)
    elif resume_filename.endswith('.docx'):
        resume_text = parse_docx(resume_bytes)
    else:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX formats are supported for resume.")

    # 1b. Parse JD
    jd_bytes = await job_description_file.read()
    jd_filename = job_description_file.filename.lower()
    
    if jd_filename.endswith('.pdf'):
        jd_text = parse_pdf(jd_bytes)
    elif jd_filename.endswith('.docx'):
        jd_text = parse_docx(jd_bytes)
    else:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX formats are supported for job description.")

    # 2. Chunking
    chunks = chunk_text(resume_text)
    
    # 3. Extraction
    resume_skills = extract_skills_spacy(resume_text)
    jd_skills = extract_skills_spacy(jd_text)
    
    # 4. Gap Detection
    matching, missing, priorities = detect_skill_gaps(resume_skills, jd_skills)
    
    # 5. Course Retrieval
    course_recs = []
    for skill in missing:
        courses = retriever.search(skill, top_k=3)
        course_recs.append({"skill": skill, "courses": courses})
        
    # 6. LLM Processing
    final_output = query_llm_for_analysis(
        resume_text=resume_text,
        jd_text=jd_text,
        matching_skills=matching,
        missing_skills=missing,
        gap_priorities=priorities,
        course_recs=course_recs
    )
    
    # Ensure it follows the schema
    try:
        validated = AnalysisResponse(**final_output)
        return validated
    except Exception as e:
        print(f"Validation error: {e}")
        return JSONResponse(status_code=500, content={"error": "LLM returned unparsable response", "raw": final_output})

@app.get("/")
def root():
    return {"message": "AI Career Intelligence Engine is running."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
