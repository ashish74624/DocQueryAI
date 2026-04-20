import { useState } from "react";
import { uploadDocument } from "../lib/api";
import type { DocumentItem } from "../types";

interface Props {
    setDocuments: React.Dispatch<
        React.SetStateAction<DocumentItem[]>
    >;
    setActiveDoc: (doc: DocumentItem) => void;
}

export default function UploadBox({
    setDocuments,
    setActiveDoc,
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        try {
            const data = await uploadDocument(file);

            const newDoc = {
                id: data.doc_id,
                name: file.name,
            };

            setDocuments((prev) => [...prev, newDoc]);
            setActiveDoc(newDoc);
            setFile(null);
        } catch  {
            alert("Upload failed");
        }

        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                }
                className="w-full text-sm"
            />

            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                {loading ? "Uploading..." : "Upload PDF"}
            </button>
        </div>
    );
}