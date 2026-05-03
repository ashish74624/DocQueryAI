/* eslint-disable @typescript-eslint/no-explicit-any */
import SessionList from "./SessionList";

export default function Sidebar(props: any) {
    const {
        sessions,
        activeSession,
        setActiveSession,
        user,
        onLogout,
        setMode,
    } = props;

    return (
        <div className="w-65 shrink-0 flex flex-col bg-[#141410] border-r border-[#2e2c27] overflow-hidden">
            {/* Logo */}
            <div className="px-4 pt-5 pb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" fillOpacity="0.9" />
                        </svg>
                    </div>
                    <span className="font-semibold text-[15px] text-[#e8e3d8] tracking-tight">DocuQuery</span>
                </div>
            </div>

            {/* Session list — scrollable, takes all remaining space */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                <SessionList
                    sessions={sessions}
                    activeSession={activeSession}
                    setActiveSession={setActiveSession}
                    setMode={setMode}
                />
            </div>

            {/* User footer — pinned to bottom, never scrolls away */}
            <div className="shrink-0 border-t border-[#2e2c27] p-3">
                <div className="flex items-center gap-2.5 group">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shrink-0 text-white text-xs font-semibold uppercase">
                        {user?.name?.[0] ?? "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#e8e3d8] font-medium truncate leading-tight">
                            {user?.name ?? "User"}
                        </p>
                        <button
                            onClick={onLogout}
                            className="text-xs text-[#8a8578] hover:text-[#c9a96e] transition-colors duration-150 leading-tight"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}