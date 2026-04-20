
import type { Message } from "../types";
import SourceCard from "./SourceCard";

interface Props {
    message: Message;
}

export default function MessageBubble({
    message,
}: Props) {
    const isUser = message.role === "user";

    return (
        <div
            className={`max-w-3xl ${isUser ? "ml-auto" : "mr-auto"
                }`}
        >
            <div
                className={`p-4 rounded-xl ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
            >
                {message.text}
            </div>

            {message.sources &&
                message.sources.map((source, i) => (
                    <SourceCard
                        key={i}
                        source={source}
                    />
                ))}
        </div>
    );
}