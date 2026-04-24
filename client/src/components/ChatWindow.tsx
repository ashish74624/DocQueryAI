/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { askDocs } from "../lib/api";

export default function ChatWindow({
    documents,
    mode
}: any) {
    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [sources, setSources] =
        useState([]);

    const ask = async () => {
        const selected =
            documents
                .filter(
                    (d: any) =>
                        d.selected
                )
                .map(
                    (d: any) => d.id
                );

        const data =
            await askDocs(
                question,
                mode,
                selected
            );

        setAnswer(data.answer);
        setSources(data.sources);
    };

    return (
        <div className="flex-1 p-6">
            <h2 className="text-lg font-bold mb-4">
                Ask Documents
            </h2>

            <div className="flex gap-2">
                <input
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    className="flex-1 border px-4 py-2 rounded"
                />

                <button
                    onClick={ask}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Ask
                </button>
            </div>

            <div className="mt-6 bg-white p-4 rounded border">
                {answer}
            </div>

            <div className="mt-4 space-y-3">
                {sources.map(
                    (
                        s: any,
                        i
                    ) => (
                        <div
                            key={i}
                            className="bg-white border rounded p-3"
                        >
                            <p className="font-semibold">
                                {s.filename} —
                                Page {s.page}
                            </p>

                            <p className="text-sm text-slate-600">
                                {s.snippet}
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}