from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import JobDB, MatchDB, ResumeDB

engine = create_engine("sqlite:///./jobs.db")
Session = sessionmaker(bind=engine)
db = Session()

resume = db.query(ResumeDB).filter(ResumeDB.id == 8).first()
if resume:
    print(f"Resume 8 parsed as: {resume.experience_level}, {resume.preferred_roles}, {resume.skills}")

matches = db.query(MatchDB).filter(MatchDB.resume_id == 8).all()
print(f"Matches for resume 8: {len(matches)}")
for m in matches:
    print(f"Score: {m.match_score}, Reason: {m.reasoning}")
