import os
from dotenv import load_dotenv

load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# UPLOAD_DIR = "uploads"
VECTOR_DB_DIR = "vectorstores/master"

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

TOP_K = 6
WEATHER_API_KEY=os.getenv("WEATHER_API_KEY")

MODEL_NAME = "llama-3.1-8b-instant"

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = os.getenv(
    "QDRANT_COLLECTION",
    "docuquery_docs"
)

B2_KEY_ID = os.getenv("B2_KEY_ID")
B2_APPLICATION_KEY = os.getenv("B2_APPLICATION_KEY")
B2_BUCKET = os.getenv("B2_BUCKET")
B2_ENDPOINT = os.getenv("B2_ENDPOINT")
B2_REGION = os.getenv("B2_REGION")


TAVILY_API_KEY=os.getenv("TAVILY_API_KEY")