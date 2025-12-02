import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    const navItem = "text-sm px-2 hover:opacity-70";

    return (
        <nav className="w-full border-b bg-white sticky top-0">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
                <Link to="/products" className="font-semibold tracking-[.2em] text-xl">
                    XerPre
                </Link>

                <div className="flex gap-4">
                    <NavLink to="/products" className={navItem}>Products</NavLink>
                    <NavLink to="/users" className={navItem}>Users</NavLink>
                    <NavLink to="/carts" className={navItem}>Carts</NavLink>
                </div>

                <button
                    onClick={logout}
                    className="border px-3 py-1 rounded-full text-xs hover:bg-black hover:text-white"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
