/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSession } from "../lib/api";

export default function SessionList(
    props: any
) {
    const {
        sessions,
        setSessions,
        activeSession,
        setActiveSession,
    } = props;

    const newChat =
        async () => {
            const title =
                prompt(
                    "Session title?"
                ) || "New Chat";

            const session =
                await createSession(
                    title
                );

            setSessions([
                session,
                ...sessions,
            ]);

            setActiveSession(
                session
            );
        };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">
                    Chats
                </h2>

                <button
                    onClick={newChat}
                    className="text-blue-600"
                >
                    +
                </button>
            </div>

            {sessions.map(
                (s: any) => (
                    <button
                        key={s.id}
                        onClick={() =>
                            setActiveSession(
                                s
                            )
                        }
                        className={`block w-full text-left px-3 py-2 rounded mb-1 ${activeSession?.id ===
                                s.id
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100"
                            }`}
                    >
                        {s.title}
                    </button>
                )
            )}
        </div>
    );
}