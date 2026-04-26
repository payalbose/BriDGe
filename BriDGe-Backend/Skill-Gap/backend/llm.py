import requests
import json
from models import AnalysisResponse

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"

def query_llm_for_analysis(
    resume_text: str, 
    jd_text: str, 
    matching_skills: list, 
    missing_skills: list, 
    gap_priorities: dict, 
    course_recs: list
) -> dict:
    
    prompt = f"""
You are an advanced AI Career Intelligence Engine. Keep explanations concise but meaningful.
Your task is to analyze a candidate’s Resume and a Job Description (JD) and produce a precise, structured output.

--- INPUT ---
Resume Text Snippet: {resume_text[:1000]}...
Job Description Snippet: {jd_text[:1000]}...
Matching Skills: {matching_skills}
Missing Skills: {missing_skills}
Priority Gaps: {gap_priorities}
Course Recommendations: {course_recs}
-------------

Return STRICT JSON in the following format:
{{
  "matching_skills": [],
  "missing_skills": [],
  "skill_gap_analysis": {{
    "high_priority": [],
    "medium_priority": [],
    "low_priority": []
  }},
  "recommended_courses": [
    {{
      "skill": "skill_name",
      "courses": ["course1", "course2"]
    }}
  ],
  "career_insight": "A brief contextual insight based on experience",
  "improvement_roadmap": ["Step 1", "Step 2"]
}}

OUTPUT ONLY JSON AND NOTHING ELSE. Do not include markdown formatting like ```json.
"""

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=60)
        if response.status_code == 200:
            result = response.json().get("response", "")
            try:
                # Attempt to parse json to ensure validity. Sometime LLMs add markdown
                result = result.strip()
                if result.startswith("```json"):
                    result = result[7:]
                if result.endswith("```"):
                    result = result[:-3]
                
                parsed_json = json.loads(result)
                return parsed_json
            except json.JSONDecodeError:
                print("Failed to parse JSON from LLM. Returning fallback structure.")
                return _fallback_response(matching_skills, missing_skills, gap_priorities, course_recs)
        else:
            print(f"Ollama error: {response.text}")
            return _fallback_response(matching_skills, missing_skills, gap_priorities, course_recs)
    except Exception as e:
        print(f"Error calling Ollama API: {e}")
        return _fallback_response(matching_skills, missing_skills, gap_priorities, course_recs)


def _fallback_response(matching, missing, gaps, courses):
    missing_str = ", ".join(missing[:3]) if missing else "any critical skills"
    matching_str = ", ".join(matching[:3]) if matching else "foundation"
    
    insight = f"Based on your profile, you have a strong foundation in {matching_str}. To better align with this role, we recommend focusing on acquiring {missing_str}. Completing the recommended courses will significantly boost your profile."
    
    roadmap = ["Focus on high priority missing skills first."]
    if missing:
        roadmap.append(f"Begin learning core concepts for {missing[0]}.")
    if courses:
        roadmap.append("Complete the recommended courses to bridge the gap.")
    roadmap.append("Update your resume to highlight new proficiencies.")

    return {
        "matching_skills": matching,
        "missing_skills": missing,
        "skill_gap_analysis": {
            "high_priority": gaps.get("high", []),
            "medium_priority": gaps.get("medium", []),
            "low_priority": gaps.get("low", [])
        },
        "recommended_courses": courses,
        "career_insight": insight,
        "improvement_roadmap": roadmap
    }
