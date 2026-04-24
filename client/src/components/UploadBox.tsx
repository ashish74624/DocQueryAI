
import { uploadFile } from "../lib/api";

export default function UploadBox(
   
) {
    const handleUpload =
        async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file =
                e.target.files?.[0];

            if (!file) return;

            await uploadFile(file);

            window.location.reload();
        };

    return (
        <input
            type="file"
            accept=".pdf"
            onChange={
                handleUpload
            }
            className="w-full"
        />
    );
}