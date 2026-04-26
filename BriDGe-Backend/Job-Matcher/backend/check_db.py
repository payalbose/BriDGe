from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import JobDB, MatchDB

engine = create_engine("sqlite:///./jobs.db")
Session = sessionmaker(bind=engine)
db = Session()

print(f"Jobs: {db.query(JobDB).count()}")
print(f"Matches: {db.query(MatchDB).count()}")

for match in db.query(MatchDB).all():
    print(f"Resume {match.resume_id} -> Job {match.job_id}: score={match.match_score}, reason={match.reasoning}")
