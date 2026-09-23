import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Brain,
    BarChart3,
    Target,
    Sparkles,
    ArrowDown,
} from "lucide-react";

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className="hero-section">

            {/* ========================= */}
            {/* AUTH ACTIONS */}
            {/* ========================= */}

            <div className="hero-auth-actions">

                <button
                    className="hero-login-btn"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

                <button
                    className="hero-signup-btn"
                    onClick={() => navigate("/signup")}
                >
                    Get Started
                </button>

            </div>


            {/* ========================= */}
            {/* HERO CONTENT */}
            {/* ========================= */}

            <div className="hero-badge">
                <Sparkles size={16} />
                AI-Powered Career Development
            </div>

            <h1>
                Your Career.
                <br />
                <span>Smarter.</span>
            </h1>

            <p className="hero-description">
                HireSense helps you understand your resume,
                identify skill gaps, build career goals, and
                create a personalized path toward your target role.
            </p>

            <div className="hero-actions">

                <button
                    className="hero-primary-btn"
                    onClick={() =>
                        document
                            .getElementById("resume-analyzer")
                            ?.scrollIntoView({
                                behavior: "smooth",
                            })
                    }
                >
                    Analyze My Resume
                </button>

                <button
                    className="hero-secondary-btn"
                    onClick={() =>
                        document
                            .getElementById("how-it-works")
                            ?.scrollIntoView({
                                behavior: "smooth",
                            })
                    }
                >
                    See How It Works
                    <ArrowDown size={17} />
                </button>

            </div>

            <div className="hero-features">

                <div className="hero-feature">
                    <Brain size={18} />
                    <span>AI Insights</span>
                </div>

                <div className="hero-feature">
                    <BarChart3 size={18} />
                    <span>ATS Analysis</span>
                </div>

                <div className="hero-feature">
                    <Target size={18} />
                    <span>Career Goals</span>
                </div>

            </div>

        </header>
    );
};

export default Header;