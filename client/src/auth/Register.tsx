import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const { registerMutation } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submit = () => {
        if (!name.trim() || !email.trim() || !password.trim()) return;
        registerMutation.mutate(
            { email, password, name },
            {
                onSuccess: () => navigate("/login"),
            }
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") submit();
    };

    return (
        <div className="min-h-screen bg-[#1a1915] flex items-center justify-center px-4 font-['Söhne','ui-sans-serif',system-ui,sans-serif]">
            {/* Ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-[#c9a96e]/5 blur-[120px]" />
            </div>

            <div className="relative w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center mb-4 shadow-lg shadow-[#c9a96e]/20">
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z"
                                fill="white"
                                fillOpacity="0.95"
                            />
                        </svg>
                    </div>
                    <h1 className="text-[22px] font-semibold text-[#e8e3d8] tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-[#4a4840] mt-1">Join DocQuery to get started</p>
                </div>

                {/* Card */}
                <div className="bg-[#141410] border border-[#2e2c27] rounded-2xl p-7 shadow-xl shadow-black/30">
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-[#8a8578] tracking-wide">
                                Full name
                            </label>
                            <input
                                type="text"
                                placeholder="Jane Smith"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="name"
                                className="w-full bg-[#1e1c18] border border-[#2e2c27] rounded-xl px-4 py-2.5 text-sm text-[#e8e3d8] placeholder-[#3e3c35] focus:outline-none focus:border-[#c9a96e]/60 focus:bg-[#1a1915] transition-all duration-200"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-[#8a8578] tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="email"
                                className="w-full bg-[#1e1c18] border border-[#2e2c27] rounded-xl px-4 py-2.5 text-sm text-[#e8e3d8] placeholder-[#3e3c35] focus:outline-none focus:border-[#c9a96e]/60 focus:bg-[#1a1915] transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-[#8a8578] tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="new-password"
                                    className="w-full bg-[#1e1c18] border border-[#2e2c27] rounded-xl px-4 py-2.5 pr-10 text-sm text-[#e8e3d8] placeholder-[#3e3c35] focus:outline-none focus:border-[#c9a96e]/60 focus:bg-[#1a1915] transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4840] hover:text-[#8a8578] transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {registerMutation.isError && (
                            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-400 shrink-0">
                                    <circle cx="8" cy="8" r="7" />
                                    <path d="M8 5v3M8 11v.5" strokeLinecap="round" />
                                </svg>
                                <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            onClick={submit}
                            disabled={registerMutation.isPending || !name.trim() || !email.trim() || !password.trim()}
                            className="w-full mt-1 flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#d4b47e] disabled:bg-[#2e2c27] disabled:text-[#4a4840] disabled:cursor-not-allowed text-[#1a1915] font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-[#c9a96e]/20 hover:shadow-[#c9a96e]/30"
                        >
                            {registerMutation.isPending ? (
                                <>
                                    <div className="w-4 h-4 rounded-full border-2 border-[#1a1915]/30 border-t-[#1a1915] animate-spin" />
                                    <span>Creating account…</span>
                                </>
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </div>
                </div>

                {/* Sign in link */}
                <p className="text-center text-sm text-[#4a4840] mt-5">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#c9a96e] hover:text-[#d4b47e] font-medium transition-colors duration-150"
                    >
                        Sign in
                    </Link>
                </p>

                {/* Footer */}
                <p className="text-center text-[11px] text-[#2e2c27] mt-4">
                    DocQuery · RAG + Tool Chat
                </p>
            </div>
        </div>
    );
}