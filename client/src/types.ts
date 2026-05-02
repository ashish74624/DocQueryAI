export interface DocumentItem {
    id: number;
    doc_id: string;
    filename: string;
}

export interface SessionItem {
    id: number;
    title: string;
}

export interface MessageItem {
    id: number;
    role: "user" | "assistant";
    content: string;
}

export interface SourceItem {
    filename: string;
    page: number;
    snippet: string;
}

export interface LoginResponse {
    accessToken: string,
    tokenType: string,
    name: string
}

export interface Source {
    filename: string,
    page: number,
    snippet: string
}

interface Meta {
    usedDocs: boolean,
    usedModelKnowledge: boolean,
    toolsUsed: string[]
}

export interface AskResponse {
    answer: string,
    sources: Source[],
    meta: Meta
}

export interface AskRequest {
    sessionId: number,
    mode: string,
    question: string,
    selected_docs: string[]
}

export interface SessionItem {
    sessionId: number,
    role: string,
    createdAt: string,
    id: number,
    content: string
}

export interface ChatSession {
    id: number,
    user_id: string
    title: string,
    created_at: string,
    updated_at: string
}
