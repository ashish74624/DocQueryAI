import type { Mode } from "../types";
import type { DocumentItem } from "../types";
import UploadBox from "./UploadBox";

const MODES = [
    { key: "chat", icon: "💬", label: "Chat", desc: "General conversation" },
    { key: "rag", icon: "📄", label: "Docs", desc: "Search documents" },
    { key: "tool", icon: "🔧", label: "Tools", desc: "Use tools" },
] as const;

interface DocumentPanelProps{
    selectedDocs: string[];
    setSelectedDocs: React.Dispatch<React.SetStateAction<string[]>>;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    mode: Mode;
    onClose: () => void;
    documents: DocumentItem[];
}

export default function DocumentPanel(props: DocumentPanelProps) {
    const { documents, selectedDocs, setSelectedDocs, setMode, mode, onClose } = props;

    const toggleDoc = (id: string) => {
        if (selectedDocs.includes(id)) {
            setSelectedDocs(selectedDocs.filter((x: string) => x !== id));
        } else {
            setSelectedDocs([...selectedDocs, id]);
        }
    };

    const selectAll = () => {
        const allIds = documents.map((d) => d.docId);
        setSelectedDocs(allIds);
    };

    const clearAll = () => setSelectedDocs([]);

    return (
        <div className="w-65 shrink-0 flex flex-col bg-[#141410] border-l border-[#2e2c27] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-[#2e2c27]">
                <h2 className="text-sm font-semibold text-[#e8e3d8]">Documents</h2>
                <button
                    onClick={onClose}
                    className="text-[#4a4840] hover:text-[#e8e3d8] transition-colors duration-150 p-1 rounded"
                    title="Close panel"
                >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                </button>
            </div>

            {/* Mode switcher */}
            <div className="shrink-0 px-3 py-3 border-b border-[#2e2c27]">
                <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#4a4840] mb-2 px-1">Mode</p>
                <div className="flex gap-1">
                    {MODES.map(({ key, icon, label }) => (
                        <button
                            key={key}
                            onClick={() => setMode(key)}
                            title={label}
                            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${mode === key
                                    ? "bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/30"
                                    : "text-[#4a4840] hover:text-[#8a8578] hover:bg-[#1e1c18] border border-transparent"
                                }`}
                        >
                            <span className="text-base leading-none">{icon}</span>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Upload */}
            <div className="shrink-0 px-3 py-3 border-b border-[#2e2c27]">
                <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#4a4840] mb-2 px-1">Upload</p>
                <UploadBox />
            </div>

            {/* Documents list — scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-3 py-3">
                {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#2e2c27]">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <p className="text-[#4a4840] text-xs">No documents yet.<br />Upload a PDF to get started.</p>
                    </div>
                ) : (
                    <>
                        {/* Select all / clear */}
                        <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[#4a4840]">
                                Files ({documents.length})
                            </span>
                            <div className="flex gap-2">
                                <button onClick={selectAll} className="text-[10px] text-[#c9a96e] hover:underline">All</button>
                                <span className="text-[#2e2c27]">·</span>
                                <button onClick={clearAll} className="text-[10px] text-[#8a8578] hover:underline">None</button>
                            </div>
                        </div>

                        <div className="space-y-0.5">
                            {documents.map((doc) => {
                                const checked = selectedDocs.includes(doc.docId);
                                return (
                                    <label
                                        key={doc.id}
                                        className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-all duration-150 group ${checked ? "bg-[#c9a96e]/10" : "hover:bg-[#1e1c18]"
                                            }`}
                                    >
                                        {/* Custom checkbox */}
                                        <div className={`w-4 h-4 shrink-0 rounded flex items-center justify-center border transition-all duration-150 ${checked
                                                ? "bg-[#c9a96e] border-[#c9a96e]"
                                                : "border-[#3e3c35] group-hover:border-[#c9a96e]/50"
                                            }`}>
                                            {checked && (
                                                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#1a1915" strokeWidth="2" strokeLinecap="round">
                                                    <path d="M2 5l2.5 2.5L8 2.5" />
                                                </svg>
                                            )}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleDoc(doc.docId)}
                                            className="sr-only"
                                        />
                                        {/* File icon */}
                                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-[#4a4840]">
                                            <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z" />
                                            <path d="M9 2v4h4" />
                                        </svg>
                                        <span className={`text-xs truncate transition-colors duration-150 ${checked ? "text-[#e8e3d8]" : "text-[#8a8578] group-hover:text-[#c8c3b8]"}`}>
                                            {doc.filename}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Selection status */}
            {selectedDocs.length > 0 && (
                <div className="shrink-0 px-4 py-2.5 border-t border-[#2e2c27] bg-[#1a1915]">
                    <p className="text-xs text-[#c9a96e]">
                        {selectedDocs.length} document{selectedDocs.length > 1 ? "s" : ""} selected
                    </p>
                </div>
            )}
        </div>
    );
}