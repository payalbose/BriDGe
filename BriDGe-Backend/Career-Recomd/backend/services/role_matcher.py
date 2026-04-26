import json
from typing import List, Dict
import os

# Define the absolute or relative path to the ontology securely
ONTOLOGY_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "skill_ontology.json")

def load_ontology() -> Dict:
    with open(ONTOLOGY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def match_roles(user_skills: List[str], ontology: Dict) -> List[Dict]:
    """
    A weighted scoring algorithm to map user skills to potential career roles.
    Score = Matched Weights / Total Weights
    """
    results = []
    user_skills_set = set([s.lower() for s in user_skills])
    
    for role in ontology.get("roles", []):
        req_skills = role.get("required_skills", {})
        opt_skills = role.get("optional_skills", {})
        
        total_weight = sum(req_skills.values()) + sum(opt_skills.values())
        if total_weight == 0:
            continue
            
        matched_weight = 0.0
        matched_req = 0
        
        # Calculate scores for required skills
        for s, w in req_skills.items():
            if s.lower() in user_skills_set:
                matched_weight += w
                matched_req += 1
                
        # Calculate scores for optional skills
        for s, w in opt_skills.items():
            if s.lower() in user_skills_set:
                matched_weight += w
                
        score = matched_weight / total_weight
        # Confidence correlates heavily with how many REQUIRED skills were matched
        confidence = (matched_req / len(req_skills)) if req_skills else 1.0
        
        if score > 0:
            results.append({
                "role_name": role["name"],
                "match_score": round(score, 2),
                "confidence_score": round(confidence, 2),
                "required_skills": req_skills,
                "optional_skills": opt_skills
            })
            
    # Sort roles by best match score
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:5]  # Return Top 5 closely matching roles
