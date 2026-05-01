
import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
 

    const [mode, setMode] =
        useState(
            "login"
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    DocuQuery
                </h1>

                {mode ===
                    "login" ? (
                    <>
                        <Login />

                        <p className="text-sm text-center mt-4">
                            No account?{" "}
                            <button
                                onClick={() =>
                                    setMode(
                                        "register"
                                    )
                                }
                                className="text-blue-600"
                            >
                                Register
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Register
                        />

                        <p className="text-sm text-center mt-4">
                            Already have account?{" "}
                            <button
                                onClick={() =>
                                    setMode(
                                        "login"
                                    )
                                }
                                className="text-blue-600"
                            >
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}