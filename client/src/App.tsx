/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useEffect,
    useState,
} from "react";

import AuthPage from "./auth/AuthPage";
import Dashboard from "./Dashboard";
import {
    api,
    getToken,
} from "./lib/api";

export default function App() {
    const [user, setUser] =
        useState<any>(
            null
        );

    const loadUser =
        async () => {
            const token =
                getToken();

            if (!token)
                return;

            const res =
                await api.request(
                    "/me"
                );

            if (
                res.detail
            ) {
                localStorage.removeItem(
                    "token"
                );
                return;
            }

            setUser(
                res
            );
        };

    useEffect(() => {
        const loadUser =
            async () => {
                const token =
                    getToken();

                if (!token)
                    return;

                const res =
                    await api.request(
                        "/me"
                    );

                if (
                    res.detail
                ) {
                    localStorage.removeItem(
                        "token"
                    );
                    return;
                }

                setUser(
                    res
                );
            };
        loadUser();
    }, []);

    if (!user) {
        return (
            <AuthPage
                onLogin={
                    loadUser
                }
            />
        );
    }

    return (
        <Dashboard
            user={user }
            onLogout={() => {
                localStorage.removeItem(
                    "token"
                );
                setUser(
                    null
                );
            }}
        />
    );
}