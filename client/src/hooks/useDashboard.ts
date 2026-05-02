import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";

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
        queryFn: () => get("sessions"),
    });

    // -------------------------
    // CREATE SESSION
    // -------------------------
    const createSessionMutation = useMutation({
        mutationFn: (title: string) =>
            post("sessions", { title }),

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