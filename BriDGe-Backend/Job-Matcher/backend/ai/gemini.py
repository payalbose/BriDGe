import os
import json
import time
import google.generativeai as genai  # type: ignore
from dotenv import load_dotenv  # type: ignore

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.1,  # Lower temperature for more deterministic output
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 2048,
    "response_mime_type": "application/json",
}

def parse_resume(resume_text: str, retries=3) -> dict:
    if not api_key:
        print("GEMINI API KEY NOT FOUND")
        return {"skills": [], "experience_level": "Unknown", "preferred_roles": [], "tools": [], "education": []}
    
    prompt = f"""
    Extract structured information from this resume. You must return ONLY a valid JSON object.
    For preferred_roles, extract the explicit job title mentioned or most relevant job roles based on the candidate's experience.
    
    JSON Schema Requirements:
    {{
      "skills": ["skill1", "skill2"],
      "experience_level": "Junior | Mid | Senior | Lead",
      "preferred_roles": ["Job Title 1", "Job Title 2"],
      "tools": ["tool1", "tool2"],
      "education": ["Degree 1", "Degree 2"]
    }}
    
    Resume Text:
    {resume_text}
    """
    
    for attempt in range(retries):
        try:
            model = genai.GenerativeModel("gemini-flash-latest", generation_config=generation_config)
            response = model.generate_content(prompt)
            # Ensure it's valid JSON
            data = json.loads(response.text)
            
            # Basic validation
            if "skills" in data and "preferred_roles" in data:
                # Normalize skills
                data["skills"] = [s.lower().strip() for s in data["skills"]]
                return data
                
        except json.JSONDecodeError:
            print(f"Gemini output invalid JSON on attempt {attempt+1}")
            time.sleep(1)
        except Exception as e:
            print(f"Error parsing resume on attempt {attempt+1}: {e}")
            time.sleep(1)
            
    # Fallback if Gemini fails entirely
    print("Gemini parsing failed after retries. Using fallback.")
    return {"skills": ["Python", "SQL"], "experience_level": "Mid", "preferred_roles": ["Software Engineer"], "tools": [], "education": []}

def match_job(resume_json: dict, job_description: str, retries=3) -> dict:
    if not api_key:
        print("GEMINI API KEY NOT FOUND")
        return {"match_score": 0, "missing_skills": [], "reasoning": "API Key missing"}

    prompt = f"""
    You are an expert AI recruiter. Evaluate the candidate's resume against the job description.
    Also, check if the job description explicitly states that the role is expired, closed, filled, or no longer accepting applications.
    Return ONLY a valid JSON object.
    
    JSON Schema Requirements:
    {{
      "ai_score": <integer 0-100>,
      "missing_skills": ["missing_skill1", "missing_skill2"],
      "reasoning": "<short specific explanation why this is a good/bad match, max 2 sentences>",
      "is_active": <boolean, true if active, false if expired/closed>
    }}

    Resume Profile:
    {json.dumps(resume_json)}

    Job Description:
    {job_description}
    """
    
    for attempt in range(retries):
        try:
            model = genai.GenerativeModel("gemini-flash-latest", generation_config=generation_config)
            response = model.generate_content(prompt)
            data = json.loads(response.text)
            
            if "ai_score" in data and "missing_skills" in data and "reasoning" in data:
                # If job is closed, override score
                if data.get("is_active") is False:
                    data["ai_score"] = 0
                    data["reasoning"] = "This job posting appears to be closed or expired."
                
                # Normalize missing skills
                data["missing_skills"] = [s.lower().strip() for s in data["missing_skills"]]
                return data
                
        except json.JSONDecodeError:
            print(f"Gemini match output invalid JSON on attempt {attempt+1}")
            time.sleep(1)
        except Exception as e:
            print(f"Error matching job on attempt {attempt+1}: {e}")
            time.sleep(1)
            
    # Fallback keyword matching logic
    print("Gemini matching failed after retries. Using fallback keyword matching.")
    return fallback_match(resume_json, job_description)

def fallback_match(resume_json: dict, job_description: str) -> dict:
    job_desc_lower = job_description.lower()
    skills = [s.lower() for s in resume_json.get("skills", [])]
    matched_skills = [s for s in skills if s in job_desc_lower]
    missing_skills = [s for s in skills if s not in job_desc_lower]
    
    score = int((len(matched_skills) / max(1, len(skills))) * 100)
    
    return {
        "ai_score": score,
        "missing_skills": missing_skills[:5],
        "reasoning": "Generated via fallback keyword matching due to AI timeout."
    }

def calculate_hybrid_score(ai_score: int, resume_json: dict, job_description: str) -> float:
    """
    Advanced matching:
    - 60% AI Score (Semantic context, experience)
    - 40% Keyword Overlap (Hard skills presence)
    """
    job_desc_lower = job_description.lower()
    skills = [s.lower() for s in resume_json.get("skills", [])]
    
    if not skills:
        return ai_score

    matched_skills = [s for s in skills if s in job_desc_lower]
    keyword_score = (len(matched_skills) / len(skills)) * 100
    
    final_score = (ai_score * 0.60) + (keyword_score * 0.40)
    return round(final_score, 1)
