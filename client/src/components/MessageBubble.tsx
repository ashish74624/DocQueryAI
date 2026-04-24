/* eslint-disable @typescript-eslint/no-explicit-any */
export default function MessageBubble(
    props: any
) {
    const {
        role,
        text,
    } = props;

    const user =
        role === "user";

    return (
        <div
            className={`max-w-3xl ${user
                    ? "ml-auto"
                    : "mr-auto"
                }`}
        >
            <div
                className={`p-4 rounded-xl ${user
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
            >
                {text}
            </div>
        </div>
    );
}