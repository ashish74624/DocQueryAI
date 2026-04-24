export const API  = "http://127.0.0.1:8000";



export async function uploadDoc(
    file: File
) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(
        `${API}/upload`,
        {
            method: "POST",
            body: fd
        }
    );

    return res.json();
}

export async function askDocs(
    question: string,
    mode: string,
    selected_docs: string[]
) {
    const res = await fetch(
        `${API}/ask`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                question,
                mode,
                selected_docs
            })
        }
    );

    return res.json();
}