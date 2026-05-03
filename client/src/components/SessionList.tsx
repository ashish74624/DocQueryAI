/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboard } from "../hooks/useDashboard";

export default function SessionList(
    props: any
) {
    const {
        sessions,
        activeSession,
        setActiveSession,
    } = props;


    const { createSessionMutation } = useDashboard();

    const newChat = async () => {
        const title = prompt("Session title?") || "New Chat";

        const session = await createSessionMutation.mutateAsync(title);

        setActiveSession(session);
    };
    return (
        <div className="mt-8 p-4 ">
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
                        title={s.title}
                        onClick={() => setActiveSession(s)}
                        className={`block w-full text-left px-3 py-2 rounded mb-1 truncate ${activeSession?.id === s.id
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