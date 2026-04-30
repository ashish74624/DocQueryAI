/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useEffect,
    useState,
} from "react";

import {
    askQuestion,
    getMessages,
} from "../lib/api";

import MessageBubble from "./MessageBubble";

export default function ChatWindow(
    props: any
) {
    const {
        activeSession,
        selectedDocs,
        mode,
    } = props;

    const [messages, setMessages] =
        useState<any[]>([]);

    const [question, setQuestion] =
        useState("");

    const [sources, setSources] =
        useState([]);





    useEffect(() => {
        if (
            activeSession
        ) {
            const loadMessages =
                async () => {
                    const data =
                        await getMessages(
                            activeSession.id
                        );

                    setMessages(data);
                };
            loadMessages();
        }
    }, [activeSession]);
    const ask =
        async () => {
            if (
                !activeSession
            )
                return;

            const data =
                await askQuestion({
                    session_id:
                        activeSession.id,
                    question,
                    mode,
                    selected_docs:
                        selectedDocs,
                });
            const loadMessages =
                async () => {
                    const data =
                        await getMessages(
                            activeSession.id
                        );

                    setMessages(data);
                };
            await loadMessages();

            setSources(data.sources || []);

            setQuestion("");
        };

    if (!activeSession) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Create or select a chat.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col  overflow-auto">
            <div className="border-b bg-white p-4 font-semibold">
                {
                    activeSession.title
                }
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map(
                    (
                        m: any
                    ) => (
                        <MessageBubble
                            key={m.id}
                            role={m.role}
                            text={
                                m.content
                            }
                        />
                    )
                )}

                {sources.map(
                    (
                        s: any,
                        i
                    ) => (
                        <div
                            key={i}
                            className="bg-white border rounded p-3 text-sm"
                        >
                            <p className="font-semibold">
                                {
                                    s.filename
                                }{" "}
                                — Page{" "}
                                {s.page}
                            </p>

                            <p className="text-slate-600 mt-1">
                                {
                                    s.snippet
                                }
                            </p>
                        </div>
                    )
                )}
            </div>

            <div className="p-4 bg-white border-t flex gap-2">
                <input
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Ask your documents..."
                    onKeyDown={(
                        e
                    ) =>
                        e.key ===
                        "Enter" &&
                        ask()
                    }
                />

                <button
                    type="button"
                    onClick={ask}
                    className="bg-blue-600 text-white px-5 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}