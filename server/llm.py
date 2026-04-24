from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME

client = Groq(api_key=GROQ_API_KEY)


def generate_answer(question, docs):
    context = "\n\n".join(
        [
            f"{doc.metadata['filename']}:\n{doc.page_content}"
            for doc in docs
        ]
    )

    prompt = f"""
You are an enterprise AI document assistant.

Use ONLY the provided context.

Mention filenames if useful.

If answer not found, say:
"I couldn't find that in the uploaded documents."

Context:
{context}

Question:
{question}

Answer:
"""

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