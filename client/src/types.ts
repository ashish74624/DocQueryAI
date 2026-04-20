export interface DocumentItem {
    id: string;
    name: string;
}

export interface SourceItem {
    page: number;
    snippet: string;
}

export interface Message {
    role: "user" | "assistant";
    text: string;
    sources?: SourceItem[];
}