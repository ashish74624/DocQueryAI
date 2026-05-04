import { useNavigate } from "react-router-dom";


const STEPS = [
    {
        num: "01",
        title: "Upload your PDFs",
        desc: "Drop in any document from the panel. Processing and indexing is instant.",
    },
    {
        num: "02",
        title: "Ask or generate",
        desc: "Query your own docs with RAG, or generate a new PDF report from live web research.",
    },
    {
        num: "03",
        title: "Get sourced answers",
        desc: "Every response cites the exact page or URL it came from. No guesswork.",
    },
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
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full bg-[#c9a96e]/6 blur-[140px]" />
                    <div className="absolute top-1/3 left-1/4 w-75 h-75 rounded-full bg-[#a07840]/5 blur-[100px]" />
                </div>
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />

                <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8 text-[#c9a96e] text-xs font-medium mb-8 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
                    Upload docs · Query them · Generate new ones
                </div>

                <h1 className="relative max-w-3xl text-4xl md:text-6xl font-bold tracking-tight text-[#e8e3d8] leading-[1.1] mb-6">
                    Your documents,<br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c9a96e] via-[#d4b47e] to-[#a07840]">
                        finally searchable.
                    </span>
                </h1>

                <p className="relative max-w-xl text-[17px] text-[#8a8578] leading-relaxed mb-10">
                    DocuQuery lets you upload PDFs and get precise, cited answers — or generate brand-new research reports from live web sources. All documents, all the time.
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

                    <div className="flex h-72">
                        {/* Sidebar */}
                        <div className="w-44 border-r border-[#2e2c27] p-3 flex flex-col gap-1.5 shrink-0">
                            <div className="h-5 w-20 rounded-md bg-[#2e2c27] mb-2" />
                            {["Q3 Report", "Legal Docs", "Research"].map((s, i) => (
                                <div key={s} className={`h-7 rounded-lg px-2 flex items-center ${i === 0 ? "bg-[#2e2c27]" : ""}`}>
                                    <div className={`h-2.5 rounded-sm ${i === 0 ? "w-16 bg-[#3e3c35]" : i === 1 ? "w-12 bg-[#2e2c27]" : "w-14 bg-[#2e2c27]"}`} />
                                </div>
                            ))}
                        </div>

                        {/* Chat area */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 p-5 space-y-4">
                                <div className="flex justify-end">
                                    <div className="max-w-[65%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#c9a96e]/15 border border-[#c9a96e]/25 text-xs text-[#e8e3d8]">
                                        What were the key risks mentioned in the Q3 report?
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shrink-0">
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

            {/* ── REPORT FEATURE SPOTLIGHT ── */}
            <section className="px-6 md:px-12 py-20 border-t border-[#2e2c27]">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        {/* Left: copy */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a96e] mb-3">
                                New — Research Report Generator
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#e8e3d8] tracking-tight mb-4 leading-tight">
                                Don't have a document?<br />Generate one.
                            </h2>
                            <p className="text-[#8a8578] text-[15px] leading-relaxed mb-6">
                                Enter any topic and DocuQuery searches the live web, synthesises the findings, and delivers a structured PDF report — complete with citations, key findings, and a full analysis. Up to 5 pages, ready in under 30 seconds.
                            </p>
                            <ul className="space-y-2.5">
                                {[
                                    "Live web search via Tavily",
                                    "Structured: summary · findings · analysis · sources",
                                    "Downloaded as a formatted PDF instantly",
                                    "Every claim linked to a real source URL",
                                ].map((point) => (
                                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#8a8578]">
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[#c9a96e] mt-0.5 shrink-0">
                                            <circle cx="8" cy="8" r="7" />
                                            <path d="M5 8l2 2 4-4" />
                                        </svg>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: mock report card */}
                        <div className="bg-[#141410] border border-[#2e2c27] rounded-2xl p-5 shadow-xl shadow-black/30">
                            {/* Mock input */}
                            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#4a4840] mb-2">Research topic</p>
                            <div className="bg-[#1e1c18] border border-[#c9a96e]/40 rounded-xl px-4 py-2.5 text-sm text-[#e8e3d8] mb-3">
                                The impact of AI on healthcare in 2025
                            </div>
                            <div className="w-full flex items-center justify-center gap-2 bg-[#c9a96e] text-[#1a1915] font-semibold text-sm py-2.5 rounded-xl mb-5">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Generate &amp; Download Report
                            </div>

                            {/* Mock PDF preview */}
                            <div className="bg-[#1a1915] border border-[#2e2c27] rounded-xl p-4 space-y-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#c9a96e]">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span className="text-[10px] text-[#c9a96e] font-medium">report_AI_in_healthcare_2025.pdf</span>
                                </div>
                                {/* Skeleton lines mimicking a report */}
                                <div className="h-2 rounded-sm bg-[#2e2c27] w-1/3" />
                                <div className="h-1.5 rounded-sm bg-[#2e2c27] w-full mt-1" />
                                <div className="h-1.5 rounded-sm bg-[#2e2c27] w-5/6" />
                                <div className="h-1.5 rounded-sm bg-[#2e2c27] w-4/6" />
                                <div className="h-2 rounded-sm bg-[#2e2c27] w-1/4 mt-3" />
                                <div className="h-1.5 rounded-sm bg-[#2e2c27] w-full mt-1" />
                                <div className="h-1.5 rounded-sm bg-[#2e2c27] w-3/4" />
                                <div className="flex gap-1.5 mt-3">
                                    <div className="h-1.5 rounded-full bg-[#c9a96e]/30 w-16" />
                                    <div className="h-1.5 rounded-full bg-[#2e2c27] w-24" />
                                </div>
                            </div>
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
                            <div key={num} className="flex flex-col gap-3 p-6 rounded-2xl border border-[#2e2c27] bg-[#141410]">
                                <span className="text-3xl font-bold text-[#2e2c27] tracking-tighter leading-none">{num}</span>
                                <h3 className="text-[15px] font-semibold text-[#e8e3d8]">{title}</h3>
                                <p className="text-sm text-[#8a8578] leading-relaxed">{desc}</p>
                            </div>
                        ))}
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
                <p className="text-xs text-[#2e2c27]">Upload docs · Query them · Generate new ones</p>
            </footer>
        </div>
    );
}