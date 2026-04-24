/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadDoc } from "../lib/api";

export default function UploadBox({
    setDocuments
}: any) {
    const upload = async (
        e: any
    ) => {
        const file =
            e.target.files[0];

        if (!file) return;

        const data =
            await uploadDoc(file);

        setDocuments(
            (prev: any) => [
                ...prev,
                {
                    id: data.doc_id,
                    name: data.filename,
                    selected: true
                }
            ]
        );
    };

    return (
        <input
            type="file"
            accept=".pdf"
            onChange={upload}
            className="mb-4"
        />
    );
}