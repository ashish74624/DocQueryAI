import { useState } from "react";
import type { DocumentItem } from "./types";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activeDoc, setActiveDoc] =
    useState<DocumentItem | null>(null);

  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar
        documents={documents}
        setDocuments={setDocuments}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
      />

      <ChatWindow activeDoc={activeDoc} />
    </div>
  );
}