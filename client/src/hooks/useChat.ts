import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { AskRequest, AskResponse, SessionItem, ReportRequest } from "../types";
import { useDashboard } from "./useDashboard";

export const useChat = (sessionId: number | null) => {
    const { get, post, postBlob } = useApi();
    const { sessionsQuery } = useDashboard();
    const queryClient = useQueryClient();

    // ── GET MESSAGES ─────────────────────────────────────────────────────────
    const messagesQuery = useQuery({
        queryKey: ["messages", sessionId],
        queryFn: () => get<SessionItem[]>(`sessions/${sessionId}/messages`),
        enabled: !!sessionId,
    });

    // ── ASK QUESTION ─────────────────────────────────────────────────────────
    const askMutation = useMutation({
        mutationFn: (payload: AskRequest) =>
            post<AskResponse>("ask", payload),

        onSuccess: () => {
            sessionsQuery.refetch();
            queryClient.invalidateQueries({ queryKey: ["messages", sessionId] });
        },
    });

    // ── GENERATE REPORT ──────────────────────────────────────────────────────
    // Calls POST /report → receives PDF blob → triggers browser download automatically.
    const reportMutation = useMutation({
        mutationFn: (payload: ReportRequest) =>
            postBlob("report", payload),

        onSuccess: ({ blob, filename }) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        },
    });

    return {
        messagesQuery,
        askMutation,
        reportMutation,
    };
};