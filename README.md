# BriDGe: AI-Powered Career Intelligence Platform

BriDGe is an advanced, integrated platform designed to provide intelligent career guidance, resume matching, and skill-gap analysis. The project is split into a unified frontend and a modular backend consisting of three distinct AI-driven services.

## 🚀 Project Overview

The BriDGe platform is composed of two main components:
- **BriDGe-Frontend**: A modern, responsive React application serving as the unified portal for all AI tools.
- **BriDGe-Backend**: A collection of specialized microservices powering the AI intelligence, encompassing a recommendation engine, a resume-job matcher, and a skill-gap analyzer.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **Icons**: Lucide React

### Backend Core
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **AI/ML integration**: Spacy, FAISS, Sentence Transformers, Scikit-learn, Google Generative AI (Gemini API)
- **Scraping**: Playwright, BeautifulSoup4, DuckDuckGo Search

---

## 🧠 AI Models & Services

The backend is composed of three standalone modules, each with its own FastAPI server:

### 1. Career-Recomd (Career Recommendation Engine)
Analyzes user profiles and provides tailored career path recommendations.
- **Technologies**: FastAPI, SpaCy
- **Location**: `BriDGe-Backend/Career-Recomd`
- **Default Port**: `8080`

### 2. Skill-Gap (AI Skill-Gap Analyzer)
Identifies discrepancies between a candidate's current skills and those required for their target roles, offering actionable insights and course recommendations.
- **Technologies**: FastAPI, PyMuPDF, python-docx, SpaCy, Sentence-Transformers, FAISS, Scikit-learn, LLM Processing
- **Location**: `BriDGe-Backend/Skill-Gap`
- **Default Port**: `8000`

### 3. Job-Matcher (AI Resume-Job Matcher)
Matches candidate resumes against job descriptions, leveraging LLMs for parsing and search engines to discover new opportunities. Calculates a hybrid match score based on AI reasoning.
- **Technologies**: FastAPI, PyPDF2, SQLAlchemy, Google Generative AI (Gemini API), DuckDuckGo Search, Playwright
- **Location**: `BriDGe-Backend/Job-Matcher`
- **Default Port**: `8002`

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- API Keys (e.g., Google Gemini API key required for the Job-Matcher module in a `.env` file)

### 1. Running the Frontend
Navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd BriDGe-Frontend
npm install
npm run dev
```

### 2. Running the Backend Services
Each AI model operates as a standalone FastAPI service. It is recommended to use virtual environments (`venv`) for each backend module. You will need to start them individually.

**A. Career Recommendation Engine:**
```bash
cd BriDGe-Backend/Career-Recomd/backend
python -m venv venv
# activate venv (e.g., venv\Scripts\activate on Windows)
pip install -r requirements.txt
python main.py
# Runs on http://localhost:8080
```

**B. Skill-Gap Analyzer:**
```bash
cd BriDGe-Backend/Skill-Gap
python -m venv venv
# activate venv
pip install -r requirements.txt
cd backend
python main.py
# Runs on http://localhost:8000
```

**C. Job Matcher Engine:**
```bash
cd BriDGe-Backend/Job-Matcher/backend
python -m venv venv
# activate venv
pip install -r requirements.txt
# Ensure you have set your GEMINI_API_KEY in a .env file
python main.py
# Runs on http://localhost:8002
```

## 📂 Project Structure
```text
BriDGe/
├── BriDGe-Frontend/          # Unified React (Vite) UI
│   ├── src/                  # Components, pages, and Zustand store
│   └── public/               # Static assets
└── BriDGe-Backend/           # AI Microservices
    ├── Career-Recomd/        # Recommendation Engine logic and data
    ├── Job-Matcher/          # Resume parsing, scraping, and matching logic
    └── Skill-Gap/            # Skill extraction, embeddings, and FAISS retrieval
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Ensure that you test any changes locally across both the frontend and the respective backend microservices before submitting a pull request.
