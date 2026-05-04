import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../hooks/useChat";
import type { ChatSession, Mode, Source } from "../types";

const MODE_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
    chat: { label: "Chat", icon: "💬", desc: "General conversation" },
    rag: { label: "Docs", icon: "📄", desc: "Search your documents" },
    tool: { label: "Tools", icon: "🔧", desc: "Use available tools" },
};

interface ChatWindowProps {
    activeSession: ChatSession | null;
    selectedDocs: string[];
    mode:Mode;
    docPanelOpen: boolean;
    setDocPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatWindow(props: ChatWindowProps) {
    const { activeSession, selectedDocs, mode, docPanelOpen, setDocPanelOpen } = props;

    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("");       // tool mode only
    const [sources, setSources] = useState<Source[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { messagesQuery, askMutation, reportMutation } = useChat(
        activeSession?.id || null
    );
    const messages = messagesQuery.data || [];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, askMutation.isPending]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
        const ta = e.target;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    };

    const ask = async () => {
        if (!activeSession || !question.trim() || askMutation.isPending) return;
        const res = await askMutation.mutateAsync({
            sessionId: activeSession.id,
            question,
            mode,
            selected_docs: selectedDocs,
        });
        setSources(res.sources || []);
        setQuestion("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    const generateReport = () => {
        if (!activeSession || !topic.trim() || reportMutation.isPending) return;
        reportMutation.mutate({ topic, sessionId: activeSession.id });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); }
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

            {/* ── Header ── */}
            <div className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-[#2e2c27] bg-[#1a1915]">
                <div className="flex items-center gap-3 min-w-0">
                    <h2 className="text-[15px] font-semibold text-[#e8e3d8] truncate">
                        {activeSession.title}
                    </h2>
                    <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2e2c27] text-[#c9a96e] border border-[#3e3c35]">
                        <span>{currentMode.icon}</span>
                        <span>{currentMode.label}</span>
                    </span>
                </div>

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

            {/* ── Tool mode: Report generator ── */}
            {mode === "tool" && (
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                    <div className="w-full max-w-lg">

                        {/* Heading */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center mb-4 shadow-lg shadow-[#c9a96e]/20">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-[#e8e3d8] mb-1">Research Report</h3>
                            <p className="text-sm text-[#8a8578] max-w-sm leading-relaxed">
                                Enter any topic and get a sourced, structured PDF report — up to 5 pages, generated from live web search.
                            </p>
                        </div>

                        {/* Input card */}
                        <div className="bg-[#141410] border border-[#2e2c27] rounded-2xl p-5">
                            <label className="block text-xs font-medium text-[#8a8578] mb-2 tracking-wide uppercase">
                                Research topic
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && generateReport()}
                                placeholder="e.g. The impact of AI on healthcare in 2025"
                                disabled={reportMutation.isPending}
                                className="w-full bg-[#1e1c18] border border-[#2e2c27] rounded-xl px-4 py-2.5 text-sm text-[#e8e3d8] placeholder-[#3e3c35] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200 disabled:opacity-50"
                            />

                            <button
                                onClick={generateReport}
                                disabled={reportMutation.isPending || !topic.trim()}
                                className="mt-3 w-full flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#d4b47e] disabled:bg-[#2e2c27] disabled:text-[#4a4840] disabled:cursor-not-allowed text-[#1a1915] font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-[#c9a96e]/20"
                            >
                                {reportMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 rounded-full border-2 border-[#1a1915]/30 border-t-[#1a1915] animate-spin" />
                                        Researching &amp; generating PDF…
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Generate &amp; Download Report
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Status feedback */}
                        {reportMutation.isPending && (
                            <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c9a96e]/8 border border-[#c9a96e]/20">
                                <div className="flex gap-1 shrink-0">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
                                            style={{ animationDelay: `${i * 150}ms` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-[#c9a96e]">
                                    Searching the web and writing your report — this takes about 15–20 seconds…
                                </p>
                            </div>
                        )}

                        {reportMutation.isSuccess && (
                            <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-emerald-400 shrink-0">
                                    <circle cx="8" cy="8" r="7" />
                                    <path d="M5 8l2 2 4-4" />
                                </svg>
                                <p className="text-xs text-emerald-400">Report downloaded successfully!</p>
                            </div>
                        )}

                        {reportMutation.isError && (
                            <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-400 shrink-0">
                                    <circle cx="8" cy="8" r="7" />
                                    <path d="M8 5v3M8 11v.5" strokeLinecap="round" />
                                </svg>
                                <p className="text-xs text-red-400">
                                    {(reportMutation.error as Error)?.message || "Something went wrong. Please try again."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Messages (chat + rag) ── */}
            {mode !== "tool" && (
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                    {messages.length === 0 && !askMutation.isPending && (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-20">
                            <p className="text-[#4a4840] text-sm max-w-xs">
                                {mode === "rag" && selectedDocs.length > 0
                                    ? `Ask anything about your ${selectedDocs.length} selected document${selectedDocs.length > 1 ? "s" : ""}.`
                                    : mode === "rag"
                                        ? "Select documents from the panel, then ask questions."
                                        : "Start a conversation."}
                            </p>
                        </div>
                    )}

                    {messages.map((m) => (
                        <MessageBubble key={m.id} role={m.role} text={m.content} />
                    ))}

                    {sources.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-xs font-semibold text-[#4a4840] uppercase tracking-wider px-1">Sources</p>
                            {sources.map((s, i) => (
                                <div key={i} className="bg-[#1e1c18] border border-[#2e2c27] rounded-xl p-3.5 text-sm">
                                    <p className="font-semibold text-[#c9a96e] text-xs mb-1">{s.filename} — p.{s.page}</p>
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
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
                                        style={{ animationDelay: `${i * 150}ms` }} />
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            )}

            {/* ── Input bar (chat + rag only) ── */}
            {mode !== "tool" && (
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
                                    : "Message DocuQuery… (Enter to send, Shift+Enter for newline)"
                            }
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2.5">
                            <div className="flex items-center gap-2">
                                {mode === "rag" && selectedDocs.length > 0 && (
                                    <span className="text-xs text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/25 px-2 py-0.5 rounded-full">
                                        {selectedDocs.length} doc{selectedDocs.length > 1 ? "s" : ""} selected
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={ask}
                                disabled={askMutation.isPending || !question.trim()}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c9a96e] hover:bg-[#d4b47e] disabled:bg-[#2e2c27] disabled:cursor-not-allowed transition-all duration-150 shrink-0"
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                                    className={askMutation.isPending || !question.trim() ? "text-[#4a4840]" : "text-[#1a1915]"}
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 12V4M4 8l4-4 4 4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}