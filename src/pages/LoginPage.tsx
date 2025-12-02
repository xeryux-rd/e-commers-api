import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setU] = useState("");
    const [password, setP] = useState("");

    const submit = (e: any) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form
                onSubmit={submit}
                className="border p-6 w-80 rounded-lg shadow-sm flex flex-col gap-3"
            >
                <h1 className="text-xl font-semibold">Login</h1>

                <input
                    placeholder="username"
                    className="border px-3 py-2 rounded"
                    onChange={(e) => setU(e.target.value)}
                />

                <input
                    placeholder="password"
                    type="password"
                    className="border px-3 py-2 rounded"
                    onChange={(e) => setP(e.target.value)}
                />

                <button className="bg-black text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
