/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../hooks/useChat";
import type { Source } from "../types";

export default function ChatWindow(props: any) {
    const { activeSession, selectedDocs, mode } = props;

    const [question, setQuestion] = useState("");
    const [sources, setSources] = useState<Source[]>([]);

    const { messagesQuery, askMutation } = useChat(
        activeSession?.id || null
    );

    const messages = messagesQuery.data || [];
    console.log("messagesQuery.data ", messagesQuery.data)
    const ask = async () => {
        if (!activeSession || !question.trim()) return;

        const payload = {
            sessionId: activeSession.id,
            question,
            mode,
            selected_docs: selectedDocs,
        };

        const res = await askMutation.mutateAsync(payload);

        setSources(res.sources || []);
        setQuestion("");
    };

    if (!activeSession) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Create or select a chat.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            {/* HEADER */}
            <div className="border-b bg-white p-4 font-semibold">
                {activeSession.title}
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((m) => (
                    <MessageBubble
                        key={m.id}
                        role={m.role}
                        text={m.content}
                    />
                ))}

                {/* SOURCES */}
                {sources.map((s, i) => (
                    <div
                        key={i}
                        className="bg-white border rounded p-3 text-sm"
                    >
                        <p className="font-semibold">
                            {s.filename} — Page {s.page}
                        </p>
                        <p className="text-slate-600 mt-1">
                            {s.snippet}
                        </p>
                    </div>
                ))}

                {askMutation.isPending && (
                    <div className="text-sm text-gray-500">
                        Thinking...
                    </div>
                )}
            </div>

            {/* INPUT */}
            <div className="p-4 bg-white border-t flex gap-2">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Ask your documents..."
                    onKeyDown={(e) =>
                        e.key === "Enter" && ask()
                    }
                />

                <button
                    onClick={ask}
                    className="bg-blue-600 text-white px-5 rounded"
                    disabled={askMutation.isPending}
                >
                    Send
                </button>
            </div>
        </div>
    );
}