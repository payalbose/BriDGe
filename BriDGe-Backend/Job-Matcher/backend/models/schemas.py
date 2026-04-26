from pydantic import BaseModel
from typing import List, Optional

class ResumeParseResult(BaseModel):
    skills: List[str]
    experience_level: str
    preferred_roles: List[str]
    tools: List[str]
    education: List[str]

class JobData(BaseModel):
    title: str
    company: str
    description: str
    url: str

class MatchResult(BaseModel):
    match_score: float
    missing_skills: List[str]
    reasoning: str

class JobMatchResponse(BaseModel):
    job_id: int
    title: str
    company: str
    url: str
    match_score: float
    missing_skills: List[str]
    reasoning: str
