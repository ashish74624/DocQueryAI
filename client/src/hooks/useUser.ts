import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";

export type User = {
    id: number;
    email: string;
    name: string;
};

export function getToken() {
    return localStorage.getItem("token");
}

export const useUser = () => {
    const removeToken = () => {
        localStorage.removeItem(
            "token"
        );
        return;
    }

    const queryClient = useQueryClient();

    const { get } = useApi();

    const logout = useCallback(() => {
        removeToken();
        queryClient.setQueryData(["user"], null);
        queryClient.clear();
    }, [queryClient]);

 

    const loadUser = async () => {
        const token = getToken();

        if (!token) return;

        const res = await get<User>("me");

        return res;
    };

    const getUser = useQuery({
        queryKey:["user"],
        queryFn: loadUser
    })

    return {
        getUser,
        logout,
    };
};

