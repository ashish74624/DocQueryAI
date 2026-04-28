def finalize_node(state):
    sources = []

    for d in state["docs"]:
        sources.append({
            "filename": d.metadata.get("filename"),
            "page": d.metadata.get("page"),
            "snippet": d.page_content[:250]
        })

    return {
        "sources": sources
    }