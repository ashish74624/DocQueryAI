
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()
    const { registerMutation } = useAuth();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const submit = () => {
        registerMutation.mutate({ email, password, name }, {
            onSuccess: () => {
                navigate("/login")
            }
        })
    }

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