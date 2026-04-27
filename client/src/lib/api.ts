/* eslint-disable @typescript-eslint/no-explicit-any */
export const API  = "http://127.0.0.1:8000";


export function getToken() {
  return localStorage.getItem(
    "token"
  );
}

export function logout() {
  localStorage.removeItem(
    "token"
  );
}

async function request(
  path: string,
  options: RequestInit = {}
) {
  const token =
    getToken();

  const headers: any = {
    "Content-Type":
      "application/json",
    ...(options.headers ||
      {}),
  };

  if (token) {
    headers[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  const res =
    await fetch(
      `${API}${path}`,
      {
        ...options,
        headers,
      }
    );

  return res.json();
}

export const api = {
  request,
};


export async function getDocuments() {
    const res = await fetch(`${API}/documents`);
    return res.json();
}

export async function uploadFile(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: fd,
    });

    return res.json();
}

export async function getSessions() {
    const res = await fetch(`${API}/sessions`);
    return res.json();
}

export async function createSession(title: string) {
    const res = await fetch(`${API}/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    return res.json();
}

export async function getMessages(
    sessionId: number
) {
    const res = await fetch(
        `${API}/sessions/${sessionId}/messages`
    );

    return res.json();
}

export async function askQuestion(
    payload: any
) {
    const res = await fetch(`${API}/ask`, {
        method: "POST",
        headers: {
            "Content-Type":
                "application/json",
        },
        body: JSON.stringify(payload),
    });

    return res.json();
}