import asyncio
from ddgs import DDGS
from typing import List
import re

def _sync_ddg_search(query: str, max_results: int, timelimit: str = 'm') -> List[dict]:
    results = []
    ignore_domains = ['glassdoor.com', 'salary.com', 'payscale.com', 'jooble.org', 'ziprecruiter.com', 'linkedin.com', 'indeed.com', 'naukri.com', 'foundit.in', 'monster.com']
    try:
        with DDGS() as ddgs:
            # timelimit 'w' = past week, 'm' = past month
            ddg_results = ddgs.text(query, max_results=max_results, timelimit=timelimit)
            if not ddg_results:
                return results
                
            for r in ddg_results:
                url = r.get("href", "")
                
                if any(domain in url for domain in ignore_domains):
                    continue
                    
                results.append({
                    "title": r.get("title", ""),
                    "url": url,
                    "snippet": r.get("body", "")
                })
    except Exception as e:
        print(f"Error during DDG search for query '{query}': {e}")
    return results

async def search_jobs_on_ddg_async(query: str, max_results: int = 15, timelimit: str = 'm') -> List[dict]:
    """
    Async search DuckDuckGo via thread pool. Defaults to past month (timelimit='m') for jobs.
    """
    return await asyncio.to_thread(_sync_ddg_search, query, max_results, timelimit)

def generate_search_queries(parsed_resume: dict) -> List[str]:
    """
    Generates highly targeted search queries.
    Targets ATS systems (Lever, Greenhouse, Workday) for direct apply links.
    """
    roles = parsed_resume.get("preferred_roles", [])
    if not roles:
        roles = ["Software Engineer"]
        
    skills = parsed_resume.get("skills", [])
    # Clean skills (remove special characters like (es6+) which break DuckDuckGo)
    clean_skills = [re.sub(r'[^a-zA-Z0-9\s]', '', s).strip() for s in skills if s]
    skills_query = " ".join(clean_skills[:1]) # Just use 1 main skill to keep query broad
    
    queries = []
    for role in roles[:2]:
        base_query = f'"{role}" {skills_query}'.strip()
        
        # 1. Direct ATS career pages (Direct Apply)
        queries.append(f'{base_query} (site:jobs.lever.co OR site:boards.greenhouse.io OR site:myworkdayjobs.com OR site:apply.workable.com)')
        
        # 2. General direct company career pages (excluding aggregators)
        queries.append(f'{base_query} ("apply" OR "careers") -site:linkedin.com -site:indeed.com -site:glassdoor.com -site:ziprecruiter.com')
        
    return queries
