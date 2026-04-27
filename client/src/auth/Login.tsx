/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api } from "../lib/api";

export default function Login(
    props: any
) {
    const {
        onLogin,
    } = props;

    const [email, setEmail] =
        useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const submit =
        async () => {
            const res =
                await api.request(
                    "/login",
                    {
                        method:
                            "POST",
                        body: JSON.stringify(
                            {
                                email,
                                password,
                            }
                        ),
                    }
                );

            if (
                res.detail
            ) {
                alert(
                    res.detail
                );
                return;
            }

            localStorage.setItem(
                "token",
                res.access_token
            );

            onLogin();
        };

    return (
        <div className="space-y-3">
            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
                className="w-full border px-4 py-2 rounded"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
                className="w-full border px-4 py-2 rounded"
            />

            <button
                onClick={
                    submit
                }
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}