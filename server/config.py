import os
from dotenv import load_dotenv

load_dotenv()

UPLOAD_DIR = "uploads"
VECTOR_DB_DIR = "vectorstores"

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"



GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = "llama-3.1-8b-instant"
TOP_K = 4