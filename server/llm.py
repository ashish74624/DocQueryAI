from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME

client = Groq(api_key=GROQ_API_KEY)


def run_llm(prompt: str):
    res = client.chat.completions.create(
        model=MODEL_NAME,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return res.choices[0].message.content


def generate_rag_answer(question, docs):
    context = "\n\n".join(
        [
            f"{doc.metadata['filename']}:\n{doc.page_content}"
            for doc in docs
        ]
    )

    prompt = f"""
You are an AI knowledge assistant.

Use uploaded document context first.
If useful, answer using it clearly.

Context:
{context}

Question:
{question}

Answer:
"""

    return run_llm(prompt)


def generate_general_answer(question):
    prompt = f"""
You are an intelligent helpful AI assistant.

Answer clearly and accurately.

Question:
{question}

Answer:
"""

    return run_llm(prompt)


import json


def route_question(question: str):
    prompt = f"""
You are a routing system.

Choose one route:

rag = question likely needs uploaded docs
weather = asks weather / forecast / temperature
llm = normal general question

Return ONLY valid JSON:

{{"route":"rag"}}

Question:
{question}
"""

    text = run_llm(prompt)

    try:
        data = json.loads(text)
        return data["route"]
    except:
        return "llm"


def generate_with_memory(question, memory):
    history = "\n".join(memory[-5:])

    prompt = f"""
You are a helpful AI assistant.

Recent conversation:
{history}

Question:
{question}

Answer:
"""

    return run_llm(prompt)