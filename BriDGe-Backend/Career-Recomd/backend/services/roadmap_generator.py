from models.schemas import RoadmapStep
from typing import List

def generate_roadmap(role_name: str, missing_critical: List[str], missing_optional: List[str], experience: str) -> List[RoadmapStep]:
    """
    Generates a phase-based roadmap detailing Beginner -> Advanced paths.
    Incorporates specific project milestones and core conceptual topics to tackle.
    """
    roadmap = []
    
    # Handle entirely qualified edge case
    if not missing_critical and not missing_optional:
         roadmap.append(RoadmapStep(
            phase="Career Ready",
            focus="Applying for jobs",
            topics=["Mock Interviews", "Resume Polishing"],
            projects=["Open Source Contributions", "Polishing final portfolio"]
        ))
         return roadmap

    if experience.lower() == "beginner":
        roadmap.append(RoadmapStep(
            phase="Phase 1: Foundations",
            focus=f"Core {role_name} Fundamentals",
            topics=missing_critical[:2] if missing_critical else missing_optional[:2],
            projects=["Build a Console CLI tool", "Create a static HTML/CSS page" if "html" in missing_critical else "Write basic CRUD scripts"]
        ))
        roadmap.append(RoadmapStep(
            phase="Phase 2: Intermediate Concepts",
            focus="Applying core skills collaboratively",
            topics=missing_critical[2:] + missing_optional[:1],
            projects=[f"Mini {role_name} Project (e.g. Basic Database Schema or Personal Dashboard)"]
        ))
        roadmap.append(RoadmapStep(
            phase="Phase 3: Advanced & Portfolio",
            focus="Job Readiness & Polish",
            topics=missing_optional[1:],
            projects=["End-to-End Capstone Project using all learned skills. Launch and deploy it!"]
        ))
    else:
        # Intermediate / Advanced Roadmap
        roadmap.append(RoadmapStep(
            phase="Phase 1: Closing Critical Gaps",
            focus="Rapid Targeted Skilling",
            topics=missing_critical,
            projects=[f"Integrate {', '.join(missing_critical)} into an existing project you own."]
        ))
        if missing_optional:
            roadmap.append(RoadmapStep(
                phase="Phase 2: Specialization",
                focus="Tooling and Advanced Workflows",
                topics=missing_optional,
                projects=["Complex Architecture or Optimization Project related to " + role_name]
            ))
        
    return roadmap
