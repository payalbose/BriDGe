import pandas as pd
import os

class JobDataset:
    def __init__(self, job_csv_path: str = None):
        self.skill_weights = {}
        
        if job_csv_path is None:
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            job_csv_path = os.path.join(BASE_DIR, "data", "job_dataset.csv")
            
        if os.path.exists(job_csv_path):
            try:
                df = pd.read_csv(job_csv_path)
                # Let's assume there's a 'skills' column with comma-separated skills
                if 'skills' in df.columns:
                    skill_counts = {}
                    total_jobs = len(df)
                    for skills_str in df['skills'].dropna():
                        skills = [s.strip().lower() for s in skills_str.split(',')]
                        for s in skills:
                            skill_counts[s] = skill_counts.get(s, 0) + 1
                    
                    for s, count in skill_counts.items():
                        self.skill_weights[s] = count / total_jobs
            except Exception as e:
                print(f"Error loading job dataset: {e}")
                
    def get_weight(self, skill: str) -> float:
        return self.skill_weights.get(skill.lower(), 0.1) # default low weight if not found

job_data = JobDataset()

def detect_skill_gaps(resume_skills: set, jd_skills: set):
    matching_skills = list(resume_skills.intersection(jd_skills))
    missing_skills = list(jd_skills.difference(resume_skills))
    
    # Priority sorting based on dataset weights
    # If using pure weights:
    prioritized = sorted(missing_skills, key=lambda x: job_data.get_weight(x), reverse=True)
    
    # Splitting into High, Med, Low
    n = len(prioritized)
    high_idx = max(1, n // 3)
    med_idx = max(2, 2 * n // 3)
    
    high = prioritized[:high_idx] if n > 0 else []
    medium = prioritized[high_idx:med_idx] if n > 1 else []
    low = prioritized[med_idx:] if n > 2 else []
    
    if n == 1:
        high = prioritized
        medium = []
        low = []
    elif n == 2:
        high = [prioritized[0]]
        medium = [prioritized[1]]
        low = []
        
    return matching_skills, missing_skills, {"high": high, "medium": medium, "low": low}
