import asyncio
from scraper.duckduckgo import search_jobs_on_ddg_async, generate_search_queries

parsed_resume = {
    "skills": ["python", "sql"],
    "experience_level": "Mid",
    "preferred_roles": ["Software Engineer"]
}

async def main():
    queries = generate_search_queries(parsed_resume)
    print("Queries:", queries)
    
    job_links = []
    for q in queries:
        results = await search_jobs_on_ddg_async(q, max_results=5)
        print(f"Results for {q}:", len(results))
        for r in results:
            job_links.append(r["url"])
        await asyncio.sleep(2) # Prevent rate limiting
            
    print(f"Found {len(job_links)} links.")

asyncio.run(main())
