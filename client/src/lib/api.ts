/* eslint-disable @typescript-eslint/no-explicit-any */

export const API = "http://127.0.0.1:8000";

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

async function request(
  path: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const headers: any = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers,
  });

  return await res.json();
}

export const api = {
  request,
};

export async function getDocuments() {
  return await api.request("/documents");
}

export async function getSessions() {
  return await api.request("/sessions");
}

export async function createSession(title: string) {
  return await api.request("/sessions", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function getMessages(
  sessionId: number
) {
  return await api.request(
    `/sessions/${sessionId}/messages`
  );
}

export async function askQuestion(
  payload: any
) {
  return await api.request("/ask", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  return await api.request("/upload", {
    method: "POST",
    body: fd,
  });
}