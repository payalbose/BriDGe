from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(
    title="Career Recommendation Engine API",
    description="100% Free AI Career Recommendation Engine using NLP and Scraping.",
    version="1.0.0"
)

# Allow Frontend to communicate properly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Main API Router
app.include_router(router.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Career Recommendation Engine API!",
        "status": "Operational",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    # Start up the ASGI server
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
