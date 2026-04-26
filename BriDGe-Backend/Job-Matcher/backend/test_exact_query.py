from ddgs import DDGS
from scraper.duckduckgo import generate_search_queries

parsed_resume = {
    "experience_level": "Junior",
    "preferred_roles": ['Frontend Developer', 'Software Developer'],
    "skills": ['javascript (es6+)', 'html5', 'css3', 'react.js']
}

queries = generate_search_queries(parsed_resume)
for q in queries:
    print("Query:", q)
    with DDGS() as ddgs:
        results = ddgs.text(q, max_results=5, timelimit='w')
        print(f"Results: {len(results) if results else 0}")
