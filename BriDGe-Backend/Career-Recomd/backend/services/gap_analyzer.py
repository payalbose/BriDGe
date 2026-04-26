from typing import List, Dict

def analyze_gap(user_skills: List[str], target_role_data: Dict) -> Dict:
    """
    Computes critical and optional missing skills by comparing user skills
    against the target role's ontology representation.
    """
    user_skills_set = set([s.lower() for s in user_skills])
    critical_missing = []
    optional_missing = []
    
    for skill in target_role_data.get("required_skills", {}):
        if skill.lower() not in user_skills_set:
            critical_missing.append(skill)
            
    for skill in target_role_data.get("optional_skills", {}):
        if skill.lower() not in user_skills_set:
            optional_missing.append(skill)
            
    return {
        "critical": critical_missing,
        "optional": optional_missing
    }
