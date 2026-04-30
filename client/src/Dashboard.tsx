/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

import {
  getDocuments,
  getSessions,
} from "./lib/api";

import type {
  DocumentItem,
  SessionItem,
} from "./types";
import DocumentPanel from "./components/DocumentPanel";

export default function Dashboard(
  props: any
) {
  const {
    user,
    onLogout,
  } = props;
  const [documents, setDocuments] =
    useState<DocumentItem[]>([]);

  const [sessions, setSessions] =
    useState<SessionItem[]>([]);

  const [activeSession, setActiveSession] =
    useState<SessionItem | null>(null);



  const [selectedDocs, setSelectedDocs] =
    useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const docs =
        await getDocuments();

      const sess =
        await getSessions();

      setDocuments(docs);
      setSessions(sess);
    };
    loadData();
  }, []);

  const [mode, setMode] =
    useState<"chat" | "rag" | "tool">("chat");

  console.log("mode ", mode)
  return (
    <div className="h-screen flex bg-slate-100">

      <Sidebar
        setDocuments={setDocuments}
        sessions={sessions}
        setSessions={setSessions}
        activeSession={activeSession}
        setActiveSession={
          setActiveSession
        }
        
        mode={mode}
        setMode={setMode}
        user={user}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col">

        <ChatWindow
          activeSession={
            activeSession
          }
          selectedDocs={
            selectedDocs
          }
          mode={mode}
        />
      </div>
      <DocumentPanel selectedDocs={
          selectedDocs
        }
        setSelectedDocs={
          setSelectedDocs
        }  
        documents={documents}
      setMode={setMode}
        />
    </div>
  );
}