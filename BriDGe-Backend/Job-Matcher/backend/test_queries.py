from ddgs import DDGS

with DDGS() as ddgs:
    q1 = '"Software Engineer" python sql site:linkedin.com/jobs/view'
    q2 = 'Software Engineer python sql jobs'
    print(q1, "=>", len(ddgs.text(q1, max_results=5) or []))
    print(q2, "=>", len(ddgs.text(q2, max_results=5) or []))
