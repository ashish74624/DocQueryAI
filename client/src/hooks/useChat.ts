import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { AskRequest, AskResponse, SessionItem } from "../types";

export const useChat = (sessionId: number | null) => {
    const { get, post } = useApi();
    const queryClient = useQueryClient();

    // -------------------------
    // GET MESSAGES
    // -------------------------
    const messagesQuery = useQuery({
        queryKey: ["messages", sessionId],
        queryFn: () => get<SessionItem[]>(`sessions/${sessionId}/messages`),
        enabled: !!sessionId,
    });

    // -------------------------
    // ASK QUESTION
    // -------------------------
    const askMutation = useMutation({
        mutationFn: (payload: AskRequest) =>
            post<AskResponse>("ask", payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["messages", sessionId],
            });
        },
    });

    return {
        messagesQuery,
        askMutation,
    };
};