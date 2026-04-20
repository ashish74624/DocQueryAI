import type { DocumentItem } from "../types";
import UploadBox from "./UploadBox";

interface Props {
    documents: DocumentItem[];
    setDocuments: React.Dispatch<
        React.SetStateAction<DocumentItem[]>
    >;
    activeDoc: DocumentItem | null;
    setActiveDoc: (doc: DocumentItem) => void;
}

export default function Sidebar({
    documents,
    setDocuments,
    activeDoc,
    setActiveDoc,
}: Props) {
    return (
        <div className="w-72 bg-white border-r p-4 flex flex-col">
            <h1 className="text-xl font-bold mb-4">
                DocuQuery
            </h1>

            <UploadBox
                setDocuments={setDocuments}
                setActiveDoc={setActiveDoc}
            />

            <div className="mt-6 space-y-2 overflow-y-auto">
                {documents.map((doc) => (
                    <button
                        key={doc.id}
                        onClick={() => setActiveDoc(doc)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition ${activeDoc?.id === doc.id
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                            }`}
                    >
                        {doc.name}
                    </button>
                ))}
            </div>
        </div>
    );
}