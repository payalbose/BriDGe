from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class CourseRecommendation(BaseModel):
    skill: str
    courses: List[str]

class PriorityGap(BaseModel):
    high_priority: List[str]
    medium_priority: List[str]
    low_priority: List[str]

class AnalysisResponse(BaseModel):
    matching_skills: List[str]
    missing_skills: List[str]
    skill_gap_analysis: PriorityGap
    recommended_courses: List[CourseRecommendation]
    career_insight: str
    improvement_roadmap: List[str]
