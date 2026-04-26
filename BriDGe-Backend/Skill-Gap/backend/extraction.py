import spacy
from spacy.matcher import PhraseMatcher
import re

# Load small english model. You might need: python -m spacy download en_core_web_sm
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spacy model en_core_web_sm...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

import pandas as pd
import os

# Dynamically load skills from dataset
def load_skills_from_dataset():
    skills_set = {
        "python", "java", "c++", "machine learning", "deep learning", 
        "fastapi", "flask", "django", "spacy", "react", "next.js",
        "docker", "kubernetes", "aws", "gcp", "azure", "sql", "nosql",
        "natural language processing", "nlp", "llm", "llama", "faiss"
    }
    
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    csv_path = os.path.join(BASE_DIR, "data", "job_dataset.csv")
    
    if os.path.exists(csv_path):
        try:
            df = pd.read_csv(csv_path)
            if 'skills' in df.columns:
                for skills_str in df['skills'].dropna():
                    skills_list = [s.strip().lower() for s in skills_str.split(',')]
                    skills_set.update(skills_list)
        except Exception as e:
            print(f"Error loading extra skills: {e}")
            
    return list(skills_set)

KNOWN_SKILLS = load_skills_from_dataset()

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
# We process in batches to avoid large load times if the dataset is huge, 
# but making patterns for a few thousand skills is acceptable.
patterns = [nlp.make_doc(text) for text in KNOWN_SKILLS if len(text) > 1]
matcher.add("SKILLS", patterns)

def extract_skills_spacy(text: str) -> set:
    """
    Extract skills from text using spaCy PhraseMatcher.
    """
    doc = nlp(text)
    matches = matcher(doc)
    
    extracted_skills = set()
    for match_id, start, end in matches:
        span = doc[start:end]
        extracted_skills.add(span.text.lower())
        
    return extracted_skills

def normalize_skill(skill: str) -> str:
    # Basic normalization (stripping punctuation, lowering case)
    return re.sub(r'[^a-zA-Z0-9]', '', skill.lower())
