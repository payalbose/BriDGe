import fitz  # PyMuPDF
import docx
import io

def parse_pdf(file_bytes: bytes) -> str:
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def parse_docx(file_bytes: bytes) -> str:
    doc = docx.Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

def chunk_text(text: str) -> dict:
    """
    A simplified chunking heuristics to separate skills, experience, and projects.
    In a real system, you might use a more advanced NLP segmentation.
    """
    text_lower = text.lower()
    
    # Very basic substring location for sections
    sections = {
        "skills": "",
        "experience": "",
        "projects": ""
    }
    
    # This is a naive implementation; 
    # it assumes standard heading names.
    skills_idx = text_lower.find("skills")
    exp_idx = text_lower.find("experience")
    proj_idx = text_lower.find("projects")
    
    indices = [(skills_idx, "skills"), (exp_idx, "experience"), (proj_idx, "projects")]
    indices = sorted([i for i in indices if i[0] != -1], key=lambda x: x[0])
    
    # Extract text between found sections
    for i in range(len(indices)):
        start_idx = indices[i][0]
        end_idx = indices[i+1][0] if i + 1 < len(indices) else len(text)
        section_name = indices[i][1]
        sections[section_name] = text[start_idx:end_idx].strip()
        
    return sections
