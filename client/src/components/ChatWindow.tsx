import { useState } from "react";
import { askQuestion } from "../lib/api";
import MessageBubble from "./MessageBubble";
import type { DocumentItem, Message } from "../types";

interface Props {
    activeDoc: DocumentItem | null;
}

export default function ChatWindow({
    activeDoc,
}: Props) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>(
        []
    );
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question || !activeDoc) return;

        const userMsg: Message = {
            role: "user",
            text: question,
        };

        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            const data = await askQuestion(
                activeDoc.id,
                question
            );

            const botMsg: Message = {
                role: "assistant",
                text: data.answer,
                sources: data.sources,
            };

            setMessages((prev) => [...prev, botMsg]);
            setQuestion("");
        } catch {
            alert("Failed to ask question");
        }

        setLoading(false);
    };

    if (!activeDoc) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Upload and select a PDF to begin.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-white font-semibold">
                {activeDoc.name}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        message={msg}
                    />
                ))}

                {loading && (
                    <div className="text-slate-500">
                        Thinking...
                    </div>
                )}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
                <input
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    placeholder="Ask about this document..."
                    className="flex-1 border rounded-lg px-4 py-2"
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleAsk()
                    }
                />

                <button
                    onClick={handleAsk}
                    className="bg-blue-600 text-white px-5 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
}