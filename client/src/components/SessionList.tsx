import { useDashboard } from "../hooks/useDashboard";
import type { ChatSession } from "../types";

interface SessionListProps {
    sessions: ChatSession[];
    activeSession: ChatSession | null;
    setActiveSession: React.Dispatch<React.SetStateAction<ChatSession | null>>
}

export default function SessionList(props: SessionListProps) {
    const { sessions, activeSession, setActiveSession } = props;
    const { createSessionMutation } = useDashboard();

    const newChat = async () => {
        const title = prompt("Session title?") || "New Chat";
        const session = await createSessionMutation.mutateAsync(title);
        setActiveSession(session);
    };

    return (
        <div className="px-2 py-2">
            {/* New Chat button */}
            <button
                onClick={newChat}
                disabled={createSessionMutation.isPending}
                className="w-full flex items-center gap-2.5 px-3 py-2 mb-3 rounded-lg text-sm text-[#8a8578] hover:text-[#e8e3d8] hover:bg-[#2a2820] transition-all duration-150 group border border-dashed border-[#2e2c27] hover:border-[#c9a96e]/40"
            >
                <span className="text-lg leading-none text-[#c9a96e] group-hover:scale-110 transition-transform duration-150">+</span>
                <span className="font-medium">New chat</span>
            </button>

            {/* Section label */}
            {sessions.length > 0 && (
                <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#4a4840]">
                    Recent
                </p>
            )}

            {/* Session list */}
            <div className="space-y-0.5">
                {sessions.map((s) => {
                    const isActive = activeSession?.id === s.id;
                    return (
                        <button
                            key={s.id}
                            title={s.title}
                            onClick={() => setActiveSession(s)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-all duration-150 ${isActive
                                ? "bg-[#2e2c27] text-[#e8e3d8] font-medium"
                                : "text-[#8a8578] hover:bg-[#1e1c18] hover:text-[#c8c3b8]"
                                }`}
                        >
                            <span className="truncate block">{s.title}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}