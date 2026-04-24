export interface DocumentItem {
    id: string;
    name: string;
    selected: boolean;
}

export interface SourceItem {
    filename: string;
    page: number;
    snippet: string;
}

export interface Message {
    role: "user" | "assistant";
    text: string;
    sources?: SourceItem[];
}