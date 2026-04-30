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

  console.log("mode ",mode)
  return (
    <div className="h-screen flex bg-slate-100">

      <Sidebar
        documents={documents}
        setDocuments={setDocuments}
        sessions={sessions}
        setSessions={setSessions}
        activeSession={activeSession}
        setActiveSession={
          setActiveSession
        }
        selectedDocs={
          selectedDocs
        }
        setSelectedDocs={
          setSelectedDocs
        }
        mode={mode}
        setMode={setMode}
      />
      <div className="flex-1 flex flex-col"> 

        <div>

          <div className="bg-white h-16 border-b p-4 flex justify-between">
            <div>
              Welcome, {user.name}
            </div>

            <button
              onClick={
                onLogout
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-2 p-3 bg-white border-b">
            <button className="px-4 py-2 border" onClick={() => setMode("chat")}>
              Chat
            </button>

            <button className="px-4 py-2 border" onClick={() => setMode("rag")}>
              Docs
            </button>

            <button className="px-4 py-2 border" onClick={() => setMode("tool")}>
              Tools
            </button>
          </div>
        </div>

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

    </div>
  );
}