import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { ChatSession, DocumentItem } from "../types";

export const useDashboard = () => {
    const { get, post } = useApi();
    const queryClient = useQueryClient();


    const documentsQuery = useQuery({
        queryKey: ["documents"],
        queryFn: () => get<DocumentItem[]>("documents"),
    });

    const sessionsQuery = useQuery({
        queryKey: ["sessions"],
        queryFn: () => get<ChatSession[]>("sessions"),
    });


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