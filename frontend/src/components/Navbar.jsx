import { useNavigate, useLocation } from "react-router-dom";
import {
    Brain,
    LayoutDashboard,
    FileText,
    LogOut,
} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <div
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                <div className="navbar-logo-icon">
                    <Brain size={19} />
                </div>

                <span>HireSense</span>
            </div>

            {/* ========================= */}
            {/* NAVIGATION */}
            {/* ========================= */}

            <div className="navbar-links">

                <button
                    className={
                        isActive("/dashboard")
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                </button>

                <button
                    className={
                        isActive("/history")
                            ? "navbar-link active"
                            : "navbar-link"
                    }
                    onClick={() =>
                        navigate("/history")
                    }
                >
                    <FileText size={16} />
                    <span>Resume History</span>
                </button>

                {/* ========================= */}
                {/* LOGOUT */}
                {/* ========================= */}

                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={15} />
                    <span>Logout</span>
                </button>

            </div>

        </nav>
    );
}

export default Navbar;