import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import type { DocumentItem } from "./types";

export default function App() {
  const [documents, setDocuments] =
    useState<DocumentItem[]>([]);

  const [mode, setMode] =
    useState<"selected" | "all">(
      "selected"
    );

  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar
        documents={documents}
        setDocuments={setDocuments}
        mode={mode}
        setMode={setMode}
      />

      <ChatWindow
        documents={documents}
        mode={mode}
      />
    </div>
  );
}