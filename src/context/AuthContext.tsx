import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

interface AuthType {
    isAuth: boolean;
    login: (u: string, p: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

    const login = async (username: string, password: string) => {
        const res = await authApi.login(username, password);
        localStorage.setItem("token", res.data.token);
        setIsAuth(true);
        navigate("/products");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside provider");
    return ctx;
};
