from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.responses import Response

from auth import get_current_user
from graph import graph

router = APIRouter()

@router.post("/report")
async def generate_report(
    topic: str = Body(..., embed=True),
    session_id: int = Body(..., embed=True),
    user=Depends(get_current_user),
):
    state = {
        "question": topic,
        "mode": "tool",
        "tool_name": "research_report",
        "selected_docs": [],
        "user_id": user.id,
        "docs": [],
        "answer": "",
        "route": "",
        "sources": [],
        "meta": {},
        "memory": [],
        "report_pdf": None,
    }

    result = graph.invoke(state)

    pdf_bytes = result.get("report_pdf")

    if not pdf_bytes:
        raise HTTPException(500, "Report generation failed")

    safe_topic = topic[:40].replace(" ", "_").replace("/", "-")

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="report_{safe_topic}.pdf"'
        },
    )