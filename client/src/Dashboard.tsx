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

  const [mode, setMode] =
    useState<"selected" | "all">(
      "selected"
    );

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


  return (
    <div className="h-screen flex bg-slate-100">
      <div className="bg-white border-b p-4 flex justify-between">
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
  );
}