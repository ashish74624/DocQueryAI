import { useNavigate } from "react-router-dom";

const FEATURES = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: "Document Grounding",
        desc: "Upload PDFs and ask questions directly against your source material. No hallucinations — only answers backed by your documents.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        title: "Semantic Search",
        desc: "Vector-powered retrieval surfaces the right passages instantly, even across dozens of documents at once.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: "Tool Use",
        desc: "Go beyond Q&A. Let the model call tools, run calculations, and take actions — all inside one unified interface.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        title: "Persistent Sessions",
        desc: "Every conversation is saved. Switch between chat sessions, pick up where you left off, and keep your history organized.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
        ),
        title: "Secure by Default",
        desc: "Your documents stay yours. Auth-gated access, token-based sessions, and no data shared across accounts.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: "Three Modes",
        desc: "Switch between pure Chat, RAG document search, and Tool calling — all in one workspace without juggling apps.",
    },
];

const STEPS = [
    { num: "01", title: "Upload your PDFs", desc: "Drop in any document from the panel. Processing is instant." },
    { num: "02", title: "Pick a mode", desc: "Chat freely, ground answers in your docs, or invoke tools." },
    { num: "03", title: "Ask anything", desc: "Get precise, sourced answers with page-level citations." },
];

export default function App() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-[#1a1915] text-[#e8e3d8] overflow-x-hidden"
            style={{ fontFamily: "'Söhne', 'ui-sans-serif', system-ui, sans-serif" }}
        >
            {/* ── NAV ── */}
            <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#2e2c27]/60 bg-[#1a1915]/80 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shadow shadow-[#c9a96e]/20">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" fillOpacity="0.95" />
                        </svg>
                    </div>
                    <span className="font-semibold text-[15px] tracking-tight text-[#e8e3d8]">DocuQuery</span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-[#8a8578] hover:text-[#e8e3d8] transition-colors duration-150 px-3 py-1.5"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-sm font-semibold bg-[#c9a96e] hover:bg-[#d4b47e] text-[#1a1915] px-4 py-1.5 rounded-lg transition-colors duration-150 shadow shadow-[#c9a96e]/20"
                    >
                        Get started
                    </button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 overflow-hidden">
                {/* Glow blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full bg-[#c9a96e]/6 blur-[140px]" />
                    <div className="absolute top-1/3 left-1/4 w-75 h-75 rounded-full bg-[#a07840]/5 blur-[100px]" />
                </div>

                {/* Grid texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />

                {/* Badge */}
                <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8 text-[#c9a96e] text-xs font-medium mb-8 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
                    RAG · Tool Use · Persistent Sessions
                </div>

                {/* Headline */}
                <h1 className="relative max-w-3xl text-4xl md:text-6xl font-bold tracking-tight text-[#e8e3d8] leading-[1.1] mb-6">
                    Ask your documents.<br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c9a96e] via-[#d4b47e] to-[#a07840]">
                        Get real answers.
                    </span>
                </h1>

                <p className="relative max-w-xl text-[17px] text-[#8a8578] leading-relaxed mb-10">
                    DocuQuery combines retrieval-augmented generation, tool calling, and persistent chat sessions into one clean workspace — so you can stop searching and start knowing.
                </p>

                <div className="relative flex items-center gap-3 flex-wrap justify-center">
                    <button
                        onClick={() => navigate("/register")}
                        className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#d4b47e] text-[#1a1915] font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#c9a96e]/25 hover:shadow-[#c9a96e]/40 hover:-translate-y-0.5"
                    >
                        Start for free
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-[#8a8578] hover:text-[#e8e3d8] border border-[#2e2c27] hover:border-[#3e3c35] px-6 py-3 rounded-xl transition-all duration-200"
                    >
                        Sign in
                    </button>
                </div>
            </section>

            {/* ── MOCK UI PREVIEW ── */}
            <section className="px-6 md:px-12 pb-24 flex justify-center">
                <div className="w-full max-w-4xl rounded-2xl border border-[#2e2c27] bg-[#141410] shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Fake window chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2e2c27] bg-[#0f0e0c]">
                        <div className="w-3 h-3 rounded-full bg-[#2e2c27]" />
                        <div className="w-3 h-3 rounded-full bg-[#2e2c27]" />
                        <div className="w-3 h-3 rounded-full bg-[#2e2c27]" />
                        <div className="flex-1 mx-4">
                            <div className="mx-auto w-48 h-5 rounded-md bg-[#1e1c18] flex items-center justify-center">
                                <span className="text-[10px] text-[#3e3c35]">docuquery.app/ask</span>
                            </div>
                        </div>
                    </div>

                    {/* Fake app layout */}
                    <div className="flex h-72">
                        {/* Sidebar */}
                        <div className="w-44 border-r border-[#2e2c27] p-3 flex flex-col gap-1.5  shrink-0">
                            <div className="h-5 w-20 rounded-md bg-[#2e2c27] mb-2" />
                            {["Q3 Report", "Legal Docs", "Research"].map((s, i) => (
                                <div key={s} className={`h-7 rounded-lg px-2 flex items-center ${i === 0 ? "bg-[#2e2c27]" : ""}`}>
                                    <div className={`h-2.5 rounded-sm bg-[#2e2c27] ${i === 0 ? "w-16 bg-[#3e3c35]" : i === 1 ? "w-12" : "w-14"}`} />
                                </div>
                            ))}
                        </div>

                        {/* Chat area */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 p-5 space-y-4">
                                {/* User message */}
                                <div className="flex justify-end">
                                    <div className="max-w-[65%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#c9a96e]/15 border border-[#c9a96e]/25 text-xs text-[#e8e3d8]">
                                        What were the key risks mentioned in the Q3 report?
                                    </div>
                                </div>
                                {/* Assistant message */}
                                <div className="flex items-start gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center  shrink-0">
                                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 max-w-[70%]">
                                        <div className="h-2.5 rounded-sm bg-[#2e2c27] w-full" />
                                        <div className="h-2.5 rounded-sm bg-[#2e2c27] w-5/6" />
                                        <div className="h-2.5 rounded-sm bg-[#2e2c27] w-4/6" />
                                        <div className="mt-2 px-2.5 py-2 rounded-lg border border-[#2e2c27] bg-[#1e1c18] text-[10px] text-[#4a4840]">
                                            📄 Q3_Report.pdf — p. 14
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Input bar */}
                            <div className="border-t border-[#2e2c27] px-4 py-3 flex items-center gap-2">
                                <div className="flex-1 h-8 rounded-xl bg-[#1e1c18] border border-[#2e2c27]" />
                                <div className="w-8 h-8 rounded-lg bg-[#c9a96e] flex items-center justify-center shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#1a1915" strokeWidth="2.2" strokeLinecap="round">
                                        <path d="M8 12V4M4 8l4-4 4 4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Doc panel */}
                        <div className="w-40 border-l border-[#2e2c27] p-3 shrink-0">
                            <div className="h-4 w-16 rounded-md bg-[#2e2c27] mb-3" />
                            <div className="h-8 rounded-xl border border-dashed border-[#3e3c35] flex items-center justify-center mb-3">
                                <span className="text-[9px] text-[#3e3c35]">Upload PDF</span>
                            </div>
                            {["Report.pdf", "Legal.pdf", "Notes.pdf"].map((f, i) => (
                                <div key={f} className="flex items-center gap-1.5 py-1">
                                    <div className={`w-3 h-3 rounded shrink-0 border ${i === 0 ? "bg-[#c9a96e] border-[#c9a96e]" : "border-[#3e3c35]"}`} />
                                    <span className="text-[9px] text-[#4a4840] truncate">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="px-6 md:px-12 py-20 border-t border-[#2e2c27]">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4840] mb-3 text-center">How it works</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#e8e3d8] text-center mb-14 tracking-tight">
                        From upload to answer in seconds
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {STEPS.map(({ num, title, desc }) => (
                            <div key={num} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-[#2e2c27] bg-[#141410]">
                                <span className="text-3xl font-bold text-[#2e2c27] tracking-tighter leading-none">{num}</span>
                                <h3 className="text-[15px] font-semibold text-[#e8e3d8]">{title}</h3>
                                <p className="text-sm text-[#8a8578] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="px-6 md:px-12 py-20 border-t border-[#2e2c27]">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4a4840] mb-3 text-center">Features</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#e8e3d8] text-center mb-14 tracking-tight">
                        Everything you need, nothing you don't
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map(({ icon, title, desc }) => (
                            <div
                                key={title}
                                className="group flex flex-col gap-3 p-5 rounded-2xl border border-[#2e2c27] bg-[#141410] hover:border-[#c9a96e]/30 hover:bg-[#161411] transition-all duration-200"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[#1e1c18] border border-[#2e2c27] group-hover:border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] transition-colors duration-200 shrink-0">
                                    {icon}
                                </div>
                                <h3 className="text-[14px] font-semibold text-[#e8e3d8]">{title}</h3>
                                <p className="text-sm text-[#8a8578] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 md:px-12 py-24 border-t border-[#2e2c27]">
                <div className="max-w-2xl mx-auto text-center relative">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 rounded-full bg-[#c9a96e]/5 blur-[100px]" />
                    </div>
                    <h2 className="relative text-3xl md:text-4xl font-bold text-[#e8e3d8] tracking-tight mb-4">
                        Ready to query your documents?
                    </h2>
                    <p className="relative text-[#8a8578] text-[16px] mb-10 leading-relaxed">
                        Create a free account and start chatting with your PDFs in under a minute.
                    </p>
                    <div className="relative flex items-center gap-3 justify-center flex-wrap">
                        <button
                            onClick={() => navigate("/register")}
                            className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#d4b47e] text-[#1a1915] font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#c9a96e]/25 hover:shadow-[#c9a96e]/40 hover:-translate-y-0.5"
                        >
                            Create free account
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm text-[#8a8578] hover:text-[#e8e3d8] border border-[#2e2c27] hover:border-[#3e3c35] px-7 py-3.5 rounded-xl transition-all duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-[#2e2c27] px-6 md:px-12 py-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center">
                        <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" />
                        </svg>
                    </div>
                    <span className="text-xs text-[#4a4840]">DocuQuery</span>
                </div>
                <p className="text-xs text-[#2e2c27]">RAG · Tool Use · Persistent Sessions</p>
            </footer>
        </div>
    );
}