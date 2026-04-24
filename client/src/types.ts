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