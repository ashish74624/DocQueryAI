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

  const didAutoInit = useRef(false);
  useEffect(() => {
    if (didAutoInit.current) return;
    if (sessionsQuery.isLoading || sessionsQuery.isError) return;
    // if user already picked something, don't override
    if (activeSession) {
      didAutoInit.current = true;
      return;
    }
    const sessions = sessionsQuery.data; // may be undefined
    // StrictMode-safe: lock immediately
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
    sessionsQuery.data,          // key: depend on data reference, not `|| []`
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
    return <>Loading...</>;
  }

  const user = getUser.data;

  console.log("mode ", mode)
  console.log("selectedDocs ", selectedDocs);


  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar
        sessions={sessions}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        user={user}
        onLogout={logOut}
        setMode={setMode}
      />

      <div className="flex-1 flex flex-col">
        <ChatWindow
          activeSession={activeSession}
          selectedDocs={selectedDocs}
          mode={mode}
        />
      </div>

      <DocumentPanel
        selectedDocs={selectedDocs}
        setSelectedDocs={setSelectedDocs}
        documents={documents}
        setMode={setMode}
      />
    </div>
  );
}