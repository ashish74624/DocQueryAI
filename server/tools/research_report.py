import os
from tavily import TavilyClient
import os
import sys

# 1. Manually add the GTK bin folder to the DLL search path
# Replace this string with the actual path you found in Step 1
gtk_path = r'C:\Program Files\GTK3-Runtime Win64\bin'

if os.path.exists(gtk_path):
    # This is the magic line for Python 3.8+ on Windows
    os.add_dll_directory(gtk_path)
else:
    print(f"Warning: GTK path {gtk_path} not found. WeasyPrint will likely fail.")

# 2. NOW you can import WeasyPrint
from weasyprint import HTML
from weasyprint import HTML
from config import TAVILY_API_KEY, GROQ_API_KEY, MODEL_NAME
from groq import Groq

client = Groq(api_key=GROQ_API_KEY)
tavily = TavilyClient(api_key=TAVILY_API_KEY)


def _search(topic: str) -> list[dict]:
    """Fetch up to 10 results from Tavily."""
    response = tavily.search(
        query=topic,
        search_depth="advanced",
        max_results=10,
        include_answer=True,
        include_raw_content=False,
    )
    return response.get("results", [])


def _build_prompt(topic: str, results: list[dict]) -> str:
    sources_block = ""
    for i, r in enumerate(results, 1):
        sources_block += (
            f"[{i}] {r.get('title', 'No title')}\n"
            f"URL: {r.get('url', '')}\n"
            f"Summary: {r.get('content', '')}\n\n"
        )

    return f"""
You are a professional research analyst. Using ONLY the sources provided below, write a
structured research report on the topic: "{topic}".

Rules:
- Maximum 5 pages worth of content (roughly 1500 words).
- Use ONLY information from the sources. Do not invent facts.
- If sources are sparse, write a shorter report — quality over quantity.
- Structure the report exactly as shown below.
- Cite sources inline using [1], [2] etc.

Required structure:
# {topic}

## Executive Summary
(2-3 sentence overview of the key findings)

## Key Findings
(3-5 bullet points of the most important facts)

## Detailed Analysis
(The main body — paragraphs expanding on the findings with citations)

## Conclusion
(1-2 paragraphs summarising what was found and any implications)

## Sources
(Numbered list of all sources used: Title — URL)

---
SOURCES:
{sources_block}

Write the report now:
"""


def _llm_report(prompt: str) -> str:
    res = client.chat.completions.create(
        model=MODEL_NAME,
        temperature=0.2,
        messages=[{"role": "user", "content": prompt}],
    )
    return res.choices[0].message.content


def _markdown_to_html(md: str, topic: str) -> str:
    """
    Minimal Markdown → HTML conversion for the most common patterns
    (headings, bold, bullets, paragraphs). Keeps WeasyPrint dependency
    self-contained without needing a full markdown library.
    """
    import re

    lines = md.split("\n")
    html_lines = []
    in_ul = False

    for line in lines:
        # h1
        if line.startswith("# "):
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            html_lines.append(f"<h1>{line[2:].strip()}</h1>")
        # h2
        elif line.startswith("## "):
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            html_lines.append(f"<h2>{line[3:].strip()}</h2>")
        # h3
        elif line.startswith("### "):
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            html_lines.append(f"<h3>{line[4:].strip()}</h3>")
        # bullet
        elif line.startswith("- ") or line.startswith("* "):
            if not in_ul:
                html_lines.append("<ul>")
                in_ul = True
            content = line[2:].strip()
            content = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", content)
            html_lines.append(f"<li>{content}</li>")
        # horizontal rule
        elif line.strip() in ("---", "***", "___"):
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            html_lines.append("<hr>")
        # blank line
        elif line.strip() == "":
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            html_lines.append("")
        # paragraph
        else:
            if in_ul:
                html_lines.append("</ul>")
                in_ul = False
            content = line.strip()
            content = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", content)
            content = re.sub(r"\*(.+?)\*", r"<em>\1</em>", content)
            # citation links
            content = re.sub(r"\[(\d+)\]", r"<sup>[\1]</sup>", content)
            html_lines.append(f"<p>{content}</p>")

    if in_ul:
        html_lines.append("</ul>")

    body = "\n".join(html_lines)

    return f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap');

  body {{
    font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #1a1917;
    margin: 0;
    padding: 0;
  }}

  .cover {{
    background: linear-gradient(135deg, #1a1915 0%, #2a2620 100%);
    color: #e8e3d8;
    padding: 80px 60px;
    min-height: 200px;
    margin-bottom: 0;
  }}

  .cover h1 {{
    font-family: 'Lora', Georgia, serif;
    font-size: 28pt;
    font-weight: 600;
    color: #c9a96e;
    margin: 0 0 12px 0;
    line-height: 1.2;
    border: none;
    padding: 0;
  }}

  .cover .subtitle {{
    font-size: 11pt;
    color: #8a8578;
    margin: 0;
  }}

  .content {{
    padding: 48px 60px;
  }}

  h1 {{
    font-family: 'Lora', Georgia, serif;
    font-size: 22pt;
    color: #1a1915;
    border-bottom: 2px solid #c9a96e;
    padding-bottom: 8px;
    margin-top: 32px;
    margin-bottom: 16px;
  }}

  h2 {{
    font-family: 'Lora', Georgia, serif;
    font-size: 15pt;
    color: #2a2620;
    margin-top: 28px;
    margin-bottom: 10px;
    border-left: 3px solid #c9a96e;
    padding-left: 10px;
  }}

  h3 {{
    font-size: 12pt;
    font-weight: 600;
    color: #3a3830;
    margin-top: 20px;
    margin-bottom: 8px;
  }}

  p {{
    margin: 0 0 12px 0;
    color: #2a2620;
  }}

  ul {{
    padding-left: 20px;
    margin: 8px 0 16px 0;
  }}

  li {{
    margin-bottom: 6px;
    color: #2a2620;
  }}

  sup {{
    color: #c9a96e;
    font-size: 8pt;
    font-weight: 600;
  }}

  hr {{
    border: none;
    border-top: 1px solid #e0dbd0;
    margin: 24px 0;
  }}

  strong {{ color: #1a1915; }}

  @page {{
    margin: 0;
    size: A4;
  }}

  @page :first {{
    margin: 0;
  }}
</style>
</head>
<body>
  <div class="cover">
    <div class="cover-inner">
      <p class="subtitle">Research Report · DocQuery</p>
    </div>
  </div>
  <div class="content">
    {body}
  </div>
</body>
</html>
"""


def generate_research_report(topic: str) -> bytes:
    """
    Full pipeline: search → LLM report → PDF bytes.
    Returns raw PDF bytes to be sent as a file download.
    """
    results = _search(topic)

    if not results:
        raise ValueError(f"No search results found for topic: {topic!r}")

    prompt = _build_prompt(topic, results)
    report_md = _llm_report(prompt)
    html = _markdown_to_html(report_md, topic)
    pdf_bytes = HTML(string=html).write_pdf()

    return pdf_bytes