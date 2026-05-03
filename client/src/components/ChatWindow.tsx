/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../hooks/useChat";
import type { Source } from "../types";

const MODE_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
    chat: {
        label: "Chat",
        icon: "💬",
        desc: "General conversation",
    },
    rag: {
        label: "Docs",
        icon: "📄",
        desc: "Search your documents",
    },
    tool: {
        label: "Tools",
        icon: "🔧",
        desc: "Use available tools",
    },
};

export default function ChatWindow(props: any) {
    const { activeSession, selectedDocs, mode, docPanelOpen, setDocPanelOpen } = props;

    const [question, setQuestion] = useState("");
    const [sources, setSources] = useState<Source[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { messagesQuery, askMutation } = useChat(activeSession?.id || null);
    const messages = messagesQuery.data || [];

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, askMutation.isPending]);

    // Auto-resize textarea
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
        const ta = e.target;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    };

    const ask = async () => {
        if (!activeSession || !question.trim() || askMutation.isPending) return;

        const payload = {
            sessionId: activeSession.id,
            question,
            mode,
            selected_docs: selectedDocs,
        };

        const res = await askMutation.mutateAsync(payload);
        setSources(res.sources || []);
        setQuestion("");

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            ask();
        }
    };

    const currentMode = MODE_LABELS[mode] || MODE_LABELS.chat;

    if (!activeSession) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1915] text-[#4a4840]">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center mb-4 opacity-50">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" />
                    </svg>
                </div>
                <p className="text-sm">Create or select a chat to begin</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#1a1915] overflow-hidden min-w-0">
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-[#2e2c27] bg-[#1a1915]">
                <div className="flex items-center gap-3 min-w-0">
                    <h2 className="text-[15px] font-semibold text-[#e8e3d8] truncate">
                        {activeSession.title}
                    </h2>
                    {/* Mode badge */}
                    <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2e2c27] text-[#c9a96e] border border-[#3e3c35]">
                        <span>{currentMode.icon}</span>
                        <span>{currentMode.label}</span>
                    </span>
                </div>

                {/* Toggle doc panel */}
                <button
                    onClick={() => setDocPanelOpen(!docPanelOpen)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${docPanelOpen
                            ? "bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/30"
                            : "text-[#8a8578] hover:text-[#e8e3d8] hover:bg-[#2e2c27] border border-transparent"
                        }`}
                >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="2" width="12" height="12" rx="2" />
                        <path d="M10 2v12" />
                    </svg>
                    Docs
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {messages.length === 0 && !askMutation.isPending && (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-20">
                        <p className="text-[#4a4840] text-sm max-w-xs">
                            {mode === "rag" && selectedDocs.length > 0
                                ? `Ask anything about your ${selectedDocs.length} selected document${selectedDocs.length > 1 ? "s" : ""}.`
                                : mode === "rag"
                                    ? "Select documents from the panel, then ask questions."
                                    : mode === "tool"
                                        ? "Ask me to use a tool for you."
                                        : "Start a conversation."}
                        </p>
                    </div>
                )}

                {messages.map((m: any) => (
                    <MessageBubble key={m.id} role={m.role} text={m.content} />
                ))}

                {/* Sources */}
                {sources.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold text-[#4a4840] uppercase tracking-wider px-1">Sources</p>
                        {sources.map((s, i) => (
                            <div
                                key={i}
                                className="bg-[#1e1c18] border border-[#2e2c27] rounded-xl p-3.5 text-sm"
                            >
                                <p className="font-semibold text-[#c9a96e] text-xs mb-1">
                                    {s.filename} — p.{s.page}
                                </p>
                                <p className="text-[#8a8578] leading-relaxed text-xs">{s.snippet}</p>
                            </div>
                        ))}
                    </div>
                )}

                {askMutation.isPending && (
                    <div className="flex items-center gap-3 px-1 py-2">
                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" />
                            </svg>
                        </div>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="shrink-0 px-4 pb-5 pt-3">
                <div className="relative bg-[#1e1c18] border border-[#2e2c27] rounded-2xl shadow-lg focus-within:border-[#c9a96e]/50 transition-colors duration-200">
                    <textarea
                        ref={textareaRef}
                        value={question}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="w-full bg-transparent text-[#e8e3d8] placeholder-[#4a4840] text-[14.5px] leading-relaxed px-4 pt-3.5 pb-12 resize-none focus:outline-none max-h-50 overflow-y-auto"
                        placeholder={
                            mode === "rag"
                                ? "Ask about your documents… (Enter to send, Shift+Enter for newline)"
                                : mode === "tool"
                                    ? "What would you like me to do?"
                                    : "Message DocuQuery… (Enter to send, Shift+Enter for newline)"
                        }
                    />

                    {/* Bottom toolbar */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2.5">
                        {/* Left: doc count if rag mode */}
                        <div className="flex items-center gap-2">
                            {mode === "rag" && selectedDocs.length > 0 && (
                                <span className="text-xs text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/25 px-2 py-0.5 rounded-full">
                                    {selectedDocs.length} doc{selectedDocs.length > 1 ? "s" : ""} selected
                                </span>
                            )}
                        </div>

                        {/* Right: send button */}
                        <button
                            onClick={ask}
                            disabled={askMutation.isPending || !question.trim()}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c9a96e] hover:bg-[#d4b47e] disabled:bg-[#2e2c27] disabled:cursor-not-allowed transition-all duration-150 shrink-0"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                                className={askMutation.isPending || !question.trim() ? "text-[#4a4840]" : "text-[#1a1915]"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M8 12V4M4 8l4-4 4 4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}