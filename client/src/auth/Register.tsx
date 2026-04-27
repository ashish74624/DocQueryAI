/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api } from "../lib/api";

export default function Register(
    props: any
) {
    const {
        goLogin,
    } = props;

    const [name, setName] =
        useState("");

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
                    "/register",
                    {
                        method:
                            "POST",
                        body: JSON.stringify(
                            {
                                name,
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

            alert(
                "Registered successfully"
            );

            goLogin();
        };

    return (
        <div className="space-y-3">
            <input
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(
                        e.target.value
                    )
                }
                className="w-full border px-4 py-2 rounded"
            />

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
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Register
            </button>
        </div>
    );
}