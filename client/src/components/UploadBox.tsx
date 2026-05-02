import { useUpload } from "../hooks/useUpload";

export default function UploadBox() {
    const uploadMutation = useUpload();

    const handleUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadMutation.mutate(file);
    };

    return (
        <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="w-full"
        />
    );
}