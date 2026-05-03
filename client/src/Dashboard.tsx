import { useEffect, useRef, useState } from "react";
import { useDashboard } from "./hooks/useDashboard";
import { useUser } from "./hooks/useUser";
import Sidebar from "./components/Sidebar";
import { logOut } from "./lib/logout";
import ChatWindow from "./components/ChatWindow";
import DocumentPanel from "./components/DocumentPanel";
import type { ChatSession } from "./types";

export default function Dashboard() {
  const { getUser } = useUser();
  const {
    documentsQuery,
    sessionsQuery,
    createSessionMutation
  } = useDashboard();

  const sessions = sessionsQuery.data || [];
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [docPanelOpen, setDocPanelOpen] = useState(true);

  const didAutoInit = useRef(false);
  useEffect(() => {
    if (didAutoInit.current) return;
    if (sessionsQuery.isLoading || sessionsQuery.isError) return;
    if (activeSession) {
      didAutoInit.current = true;
      return;
    }
    const sessions = sessionsQuery.data;
    didAutoInit.current = true;
    (async () => {
      if (sessions && sessions.length > 0) {
        setActiveSession(sessions[0]);
        return;
      }
      const created = await createSessionMutation.mutateAsync("New Chat");
      setActiveSession(created);
    })();
  }, [
    activeSession,
    sessionsQuery.isLoading,
    sessionsQuery.isError,
    sessionsQuery.data,
    createSessionMutation,
  ]);

  const documents = documentsQuery.data || [];
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [mode, setMode] = useState<"chat" | "rag" | "tool">("chat");

  if (
    getUser.isLoading ||
    documentsQuery.isLoading ||
    sessionsQuery.isLoading
  ) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1a1915]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#c9a96e] border-t-transparent animate-spin" />
          <span className="text-[#8a8578] text-sm font-medium">Loading…</span>
        </div>
      </div>
    );
  }

  const user = getUser.data;

  return (
    <div className="h-screen flex bg-[#1a1915] text-[#e8e3d8] font-['Söhne','ui-sans-serif',system-ui,sans-serif] overflow-hidden">
      <Sidebar
        sessions={sessions}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        user={user}
        onLogout={logOut}
        setMode={setMode}
      />

      <div className="flex-1 flex overflow-hidden min-w-0">
        <ChatWindow
          activeSession={activeSession}
          selectedDocs={selectedDocs}
          mode={mode}
          docPanelOpen={docPanelOpen}
          setDocPanelOpen={setDocPanelOpen}
        />
      </div>

      {docPanelOpen && (
        <DocumentPanel
          selectedDocs={selectedDocs}
          setSelectedDocs={setSelectedDocs}
          documents={documents}
          setMode={setMode}
          mode={mode}
          onClose={() => setDocPanelOpen(false)}
        />
      )}
    </div>
  );
}