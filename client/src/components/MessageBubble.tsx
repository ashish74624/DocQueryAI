interface MessageBubbleProps{
    role:string;
    text:string;
}

export default function MessageBubble(props: MessageBubbleProps) {
    const { role, text } = props;
    const isUser = role === "user";

    if (isUser) {
        return (
            <div className="flex justify-end px-2 py-1">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#c9a96e]/15 border border-[#c9a96e]/25 text-[#e8e3d8] text-[14.5px] leading-relaxed">
                    {text}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-3 px-2 py-1">
            {/* Assistant avatar */}
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white" fillOpacity="0.9" />
                </svg>
            </div>
            <div className="flex-1 min-w-0 text-[#e8e3d8] text-[14.5px] leading-relaxed pt-0.5 whitespace-pre-wrap">
                {text}
            </div>
        </div>
    );
}