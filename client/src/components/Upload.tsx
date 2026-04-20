import { useState } from "react";

function Upload() {
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

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <button onClick={uploadFile}>Upload PDF</button>
        </div>
    );
}

export default Upload;