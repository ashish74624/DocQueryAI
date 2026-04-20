import { useState, type SetStateAction } from "react";

type UploadProps = {
    setDocId: React.Dispatch<SetStateAction<string | null>>;
};

function Upload({ setDocId }: UploadProps) {
    const [file, setFile] = useState<File | null>(null);

    const uploadFile = async (): Promise<void> => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data: { doc_id: string } = await response.json();
            setDocId(data.doc_id);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default Upload;