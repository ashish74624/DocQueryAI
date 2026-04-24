/* eslint-disable @typescript-eslint/no-explicit-any */
import SessionList from "./SessionList";
import UploadBox from "./UploadBox";

export default function Sidebar(
    props: any
) {
    const {
        documents,
        selectedDocs,
        setSelectedDocs,
        sessions,
        setSessions,
        activeSession,
        setActiveSession,
        setMode,
    } = props;

    const toggleDoc = (
        id: string
    ) => {
        if (
            selectedDocs.includes(id)
        ) {
            setSelectedDocs(
                selectedDocs.filter(
                    (
                        x: string
                    ) => x !== id
                )
            );
        } else {
            setSelectedDocs([
                ...selectedDocs,
                id,
            ]);
        }
    };

    return (
        <div className="w-80 bg-white border-r p-4 overflow-y-auto">
            <h1 className="text-xl font-bold mb-4">
                DocuQuery
            </h1>

            <UploadBox
            />

            <h2 className="font-semibold mt-6 mb-2">
                Documents
            </h2>

            {documents.map(
                (doc: any) => (
                    <label
                        key={doc.id}
                        className="flex gap-2 py-1 text-sm"
                    >
                        <input
                            type="checkbox"
                            checked={selectedDocs.includes(
                                doc.doc_id
                            )}
                            onChange={() =>
                                toggleDoc(
                                    doc.doc_id
                                )
                            }
                        />

                        {doc.filename}
                    </label>
                )
            )}

            <div className="mt-6">
                <h2 className="font-semibold mb-2">
                    Search Mode
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            setMode(
                                "selected"
                            )
                        }
                        className="px-3 py-2 bg-slate-200 rounded"
                    >
                        Selected
                    </button>

                    <button
                        onClick={() =>
                            setMode(
                                "all"
                            )
                        }
                        className="px-3 py-2 bg-slate-200 rounded"
                    >
                        All
                    </button>
                </div>
            </div>

            <SessionList
                sessions={sessions}
                setSessions={
                    setSessions
                }
                activeSession={
                    activeSession
                }
                setActiveSession={
                    setActiveSession
                }
            />
        </div>
    );
}