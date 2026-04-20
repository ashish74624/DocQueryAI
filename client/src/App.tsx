import { useState } from "react";
import Upload from "./components/Upload";
import Chat from "./components/Chat";


function App() {
  const [docId, setDocId] = useState<string | null>(null);

  return (
    <div>
      <Upload setDocId={setDocId} />

      {docId && <Chat docId={docId} />}
    </div>
  );
}

export default App;