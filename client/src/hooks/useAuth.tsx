import { useMutation } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { LoginResponse } from "../types";

export const useAuth = () => {

    const { post } = useApi()
    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            post<LoginResponse>("login", { email, password })
    });

    const registerMutation = useMutation({
        mutationFn: ({ name, email, password }: { name: string, email: string; password: string }) =>
            post("register", { name, email, password }),
    });

    return { loginMutation, registerMutation };
};
