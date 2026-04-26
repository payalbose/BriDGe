import requests

url = "http://localhost:8000/analyze"
resume_path = "test_resume.docx"

jd_text = """
We are looking for a Machine Learning Engineer to join our team. 
The ideal candidate will have 3+ years of experience with Python, AWS, Docker, Kubernetes, and deep learning. 
You should be familiar with PyTorch and NLP frameworks like spaCy. We use FastAPI for our backends.
"""

with open(resume_path, "rb") as f:
    files = {"resume": f}
    data = {"jd_text": jd_text}
    print("Sending request to API...")
    response = requests.post(url, files=files, data=data)
    
    if response.status_code == 200:
        print("Success!")
        print(response.json())
    else:
        print(f"Failed with status code {response.status_code}")
        print(response.text)
