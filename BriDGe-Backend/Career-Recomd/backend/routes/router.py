from fastapi import APIRouter, HTTPException
from models.schemas import UserInput, RecommendationResponse, RoleRecommendation, SkillGap
from services.skill_extractor import extract_skills_from_text, normalize_skills
from services.role_matcher import load_ontology, match_roles
from services.gap_analyzer import analyze_gap
from services.course_scraper import get_courses_for_skills
from services.roadmap_generator import generate_roadmap

router = APIRouter()
ontology = load_ontology()

@router.post("/recommend", response_model=RecommendationResponse)
async def generate_recommendations(user_input: UserInput):
    """
    Core Recommendation Endpoint pipeline:
    1. Skill Extraction -> 2. Role Matching -> 3. Gap Analysis -> 4. Free Course Scraping -> 5. Roadmap Generation
    """
    # Collect all available ontology skills for matching
    all_ontology_skills = []
    for r in ontology.get("roles", []):
        all_ontology_skills.extend(r.get("required_skills", {}).keys())
        all_ontology_skills.extend(r.get("optional_skills", {}).keys())
    all_ontology_skills = list(set(all_ontology_skills))
    
    # Process Manual Skills
    skills = set(normalize_skills(user_input.manual_skills or []))
    
    # Process Resume
    if user_input.resume_text:
        extracted = extract_skills_from_text(user_input.resume_text, all_ontology_skills)
        skills.update(extracted)
        
    final_skills = list(skills)
    
    # Match Roles
    matched = match_roles(final_skills, ontology)
    
    if not matched and not user_input.target_role:
        raise HTTPException(status_code=400, detail="Could not detect valid tech skills. Try providing more context or a target role.")
        
    # Determine the target role for analytics
    target_role_name = user_input.target_role or (matched[0]["role_name"] if matched else "Backend Developer")
    
    # Lookup the specific ontology struct for target role
    target_ontology_data = next((r for r in ontology["roles"] if r["name"].lower() == target_role_name.lower()), None)
    
    if not target_ontology_data:
        # Provide graceful degradation via a fallback role if exact match fails
        target_ontology_data = ontology["roles"][0] 
        
    # Analyze the Skill Gaps based on target metrics
    gap = analyze_gap(final_skills, target_ontology_data)
    
    # Async Scrape completely FREE Courses
    courses = await get_courses_for_skills(gap["critical"])
    
    # Create the Personalized Roadmap
    roadmap = generate_roadmap(
        target_ontology_data["name"], 
        gap["critical"], 
        gap["optional"], 
        user_input.experience_level
    )
    
    roles_output = [RoleRecommendation(role_name=r["role_name"], match_score=r["match_score"], confidence_score=r["confidence_score"]) for r in matched]
    
    return RecommendationResponse(
        extracted_skills=final_skills,
        recommended_roles=roles_output,
        skill_gap=SkillGap(critical=gap["critical"], optional=gap["optional"]),
        courses=courses,
        roadmap=roadmap
    )
