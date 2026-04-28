import { useState } from "react";
import { api } from "../lib/api";

type ChatProps = {
    docId: string;
};

function Chat({ docId }: ChatProps) {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const ask = async (): Promise<void> => {
        try {
            const response = await api.request("http://127.0.0.1:8000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doc_id: docId,
                    question: question,
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data: { answer: string } = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    return (
        <div>
            <input
                value={question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestion(e.target.value)
                }
            />

            <button onClick={ask}>Ask</button>

            <p>{answer}</p>
        </div>
    );
}

export default Chat;