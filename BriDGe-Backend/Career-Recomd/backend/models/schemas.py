from pydantic import BaseModel
from typing import List, Dict, Optional

class UserInput(BaseModel):
    resume_text: Optional[str] = None
    manual_skills: Optional[List[str]] = None
    target_role: Optional[str] = None
    experience_level: Optional[str] = "beginner" # beginner, intermediate, advanced

class RoleRecommendation(BaseModel):
    role_name: str
    match_score: float
    confidence_score: float

class SkillGap(BaseModel):
    critical: List[str]
    optional: List[str]

class Course(BaseModel):
    title: str
    link: str
    platform: str
    duration: Optional[str] = None

class RoadmapStep(BaseModel):
    phase: str
    focus: str
    topics: List[str]
    projects: List[str]

class RecommendationResponse(BaseModel):
    extracted_skills: List[str]
    recommended_roles: List[RoleRecommendation]
    skill_gap: Optional[SkillGap]
    courses: List[Course]
    roadmap: List[RoadmapStep]
