import spacy
from typing import List
import os

# Load standard NLP model. Must be strictly open-source
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spacy model...")
    os.system("python -m spacy download en_core_web_sm")
    # Load again after downloading
    import spacy
    nlp = spacy.load("en_core_web_sm")

def extract_skills_from_text(text: str, predefined_skills: List[str]) -> List[str]:
    """
    NLP-based skill extraction using SpaCy.
    Normalizes the text and matches against an ontology list, allowing for robust extraction.
    """
    if not text:
        return []
        
    doc = nlp(text.lower())
    found_skills = set()
    text_lower = text.lower()
    
    # Matching predefined multi-word and single-word skills efficiently
    for skill in predefined_skills:
        skill_lower = skill.lower()
        if skill_lower in text_lower:
            found_skills.add(skill_lower)
            
    return list(found_skills)

def normalize_skills(skills: List[str]) -> List[str]:
    """
    Normalizes user input skills to avoid duplicates with different cases (e.g., Python vs python)
    """
    return list(set(s.lower().strip() for s in skills if s.strip()))
