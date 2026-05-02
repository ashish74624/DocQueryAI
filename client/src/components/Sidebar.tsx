/* eslint-disable @typescript-eslint/no-explicit-any */
import SessionList from "./SessionList";

export default function Sidebar(
    props: any
) {
    const {
        sessions,
        activeSession,
        setActiveSession,
        user,
        onLogout
    } = props;

    return (
        <div className="w-64 bg-white border-r  overflow-y-auto relative">
            <h1 className="text-xl font-bold mb-4 p-4">
                DocuQuery
            </h1>
            <SessionList
                sessions={sessions}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
            />

            <div id="user" className="bottom-0 border-t absolute w-full ">
                <h2>{user.name}</h2>
                <button onClick={onLogout}
                    className="w-[75%] rounded-full px-4 py-2">
                    Logout
                </button>
            </div>
        </div>
    );
}