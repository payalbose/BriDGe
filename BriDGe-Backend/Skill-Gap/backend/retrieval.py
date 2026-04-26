import pandas as pd
import faiss
import os
import numpy as np
from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

class CourseRetriever:
    def __init__(self, course_csv_path: str = None):
        self.course_dataset = None
        self.index = None
        self.course_titles = []
        
        if course_csv_path is None:
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            course_csv_path = os.path.join(BASE_DIR, "data", "coursera_dataset.csv")
            
        if os.path.exists(course_csv_path):
            # Attempt to load dataset
            try:
                self.course_dataset = pd.read_csv(course_csv_path)
                # Ensure a column like 'course_title' exists
                if 'course_title' in self.course_dataset.columns:
                    self.course_titles = self.course_dataset['course_title'].dropna().tolist()
                elif 'Course Name' in self.course_dataset.columns:
                    self.course_titles = self.course_dataset['Course Name'].dropna().tolist()
                
                if self.course_titles:
                    self._build_index()
            except Exception as e:
                print(f"Error loading course dataset: {e}")

    def _build_index(self):
        print(f"Building FAISS index for {len(self.course_titles)} courses...")
        # Encode titles
        embeddings = model.encode(self.course_titles)
        
        # FAISS setup
        dim = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dim)
        self.index.add(np.array(embeddings).astype(np.float32))
        print("FAISS index built successfully.")

    def search(self, missing_skill: str, top_k: int = 3) -> list:
        if not self.index or len(self.course_titles) == 0:
            return [f"Introduction to {missing_skill}", f"Advanced {missing_skill}"]
            
        vector = model.encode([missing_skill]).astype(np.float32)
        distances, indices = self.index.search(vector, top_k)
        
        results = []
        for idx in indices[0]:
            if idx < len(self.course_titles):
                results.append(self.course_titles[idx])
        return results

# Singleton instance
retriever = CourseRetriever()
