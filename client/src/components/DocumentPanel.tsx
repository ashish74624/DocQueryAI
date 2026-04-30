/* eslint-disable @typescript-eslint/no-explicit-any */
import UploadBox from "./UploadBox";



export default function DocumentPanel(props: any) {
    const {
        documents, ///
        selectedDocs,///
        setSelectedDocs,///
        setMode
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
        <div className="w-64 bg-white border-l p-4 overflow-y-auto relative ">
            <h1>Document Panel</h1>
            <UploadBox />

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
            <div className="flex flex-col gap-2 bg-white border-t bottom-0 absolute w-full">
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
    )
}
