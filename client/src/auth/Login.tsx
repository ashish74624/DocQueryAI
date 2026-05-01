
import { useState } from "react";
// import { api } from "../lib/api";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate()

    const { getUser } = useUser();

    const { loginMutation } = useAuth();

    const [email, setEmail] =
        useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const submit = () => {
        loginMutation.mutate({ email, password }, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.accessToken);
                getUser.refetch();
                navigate('/ask')
            }
        })
    }

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
                    () => submit()
                }
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}