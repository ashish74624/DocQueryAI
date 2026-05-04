import { useRef } from "react";
import { useUpload } from "../hooks/useUpload";

export default function UploadBox() {
    const uploadMutation = useUpload();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        uploadMutation.mutate(file);
        // Reset so same file can be re-uploaded if needed
        e.target.value = "";
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleUpload}
                className="hidden"
            />
            <button
                onClick={() => inputRef.current?.click()}
                disabled={uploadMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-[#3e3c35] hover:border-[#c9a96e]/50 text-[#8a8578] hover:text-[#e8e3d8] text-xs font-medium transition-all duration-200 hover:bg-[#c9a96e]/5 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {uploadMutation.isPending ? (
                    <>
                        <div className="w-3.5 h-3.5 rounded-full border border-[#c9a96e] border-t-transparent animate-spin" />
                        <span>Uploading…</span>
                    </>
                ) : (
                    <>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="group-hover:text-[#c9a96e] transition-colors"
                        >
                            <path d="M8 12V4M4 8l4-4 4 4" />
                            <path d="M2 13h12" />
                        </svg>
                        <span>Upload PDF</span>
                    </>
                )}
            </button>

            {uploadMutation.isSuccess && (
                <p className="text-center text-[10px] text-emerald-400 mt-1.5">✓ Uploaded successfully</p>
            )}
            {uploadMutation.isError && (
                <p className="text-center text-[10px] text-red-400 mt-1.5">Upload failed. Try again.</p>
            )}
        </div>
    );
}