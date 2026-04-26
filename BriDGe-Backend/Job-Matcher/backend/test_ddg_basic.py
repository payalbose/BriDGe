from ddgs import DDGS

try:
    with DDGS() as ddgs:
        results = ddgs.text("software engineer jobs", max_results=5)
        print(results)
except Exception as e:
    print("Error:", e)
