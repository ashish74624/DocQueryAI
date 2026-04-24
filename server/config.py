import os
from dotenv import load_dotenv

load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

UPLOAD_DIR = "uploads"
VECTOR_DB_DIR = "vectorstores/master"

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

TOP_K = 5

MODEL_NAME = "llama-3.1-8b-instant"