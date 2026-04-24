/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DocumentItem } from "../types";
import UploadBox from "./UploadBox";

interface Props {
    documents: DocumentItem[];
    setDocuments: any;
    mode: string;
    setMode: any;
}

export default function Sidebar({
    documents,
    setDocuments,
    setMode
}: Props) {
    const toggleDoc = (id: string) => {
        setDocuments((prev: DocumentItem[]) =>
            prev.map((doc) =>
                doc.id === id
                    ? {
                        ...doc,
                        selected:
                            !doc.selected
                    }
                    : doc
            )
        );
    };

    return (
        <div className="w-80 bg-white border-r p-4">
            <h1 className="text-xl font-bold mb-4">
                Documents
            </h1>

            <UploadBox
                setDocuments={setDocuments}
            />

            <div className="mt-5">
                {documents.map((doc) => (
                    <label
                        key={doc.id}
                        className="flex gap-2 py-2"
                    >
                        <input
                            type="checkbox"
                            checked={
                                doc.selected
                            }
                            onChange={() =>
                                toggleDoc(doc.id)
                            }
                        />

                        {doc.name}
                    </label>
                ))}
            </div>

            <div className="mt-6">
                <p className="font-semibold mb-2">
                    Search Mode
                </p>

                <button
                    onClick={() =>
                        setMode(
                            "selected"
                        )
                    }
                    className="mr-2 px-3 py-2 bg-slate-200 rounded"
                >
                    Selected
                </button>

                <button
                    onClick={() =>
                        setMode("all")
                    }
                    className="px-3 py-2 bg-slate-200 rounded"
                >
                    All Docs
                </button>
            </div>
        </div>
    );
}