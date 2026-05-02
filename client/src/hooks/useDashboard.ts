import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { ChatSession } from "../types";

export const useDashboard = () => {
    const { get, post } = useApi();
    const queryClient = useQueryClient();

    // -------------------------
    // DOCUMENTS
    // -------------------------
    const documentsQuery = useQuery({
        queryKey: ["documents"],
        queryFn: () => get("documents"),
    });

    // -------------------------
    // SESSIONS
    // -------------------------
    const sessionsQuery = useQuery({
        queryKey: ["sessions"],
        queryFn: () => get<ChatSession[]>("sessions"),
    });

    // -------------------------
    // CREATE SESSION
    // -------------------------
    const createSessionMutation = useMutation({
        mutationFn: (title: string) =>
            post<ChatSession>("sessions", { title }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sessions"],
            });
        },
    });

    return {
        documentsQuery,
        sessionsQuery,
        createSessionMutation,
    };
};