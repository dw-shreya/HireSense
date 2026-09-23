import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import "../auth.css";
import API from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-visual">

                <div className="auth-brand">
                    <div className="auth-brand-icon">
                        <Sparkles size={20} />
                    </div>

                    <span>HireSense</span>
                </div>

                <div className="auth-visual-content">

                    <span className="auth-eyebrow">
                        AI-POWERED CAREER DEVELOPMENT
                    </span>

                    <h1>
                        Build the career
                        <br />
                        <span>you deserve.</span>
                    </h1>

                    <p>
                        Understand your resume, identify skill gaps,
                        and follow a personalized path toward your
                        target role.
                    </p>

                </div>

                <div className="auth-visual-footer">
                    <span>Resume Intelligence</span>
                    <span>•</span>
                    <span>Career Roadmaps</span>
                    <span>•</span>
                    <span>Progress Tracking</span>
                </div>

            </div>


            <div className="auth-form-section">

                <div className="auth-form-wrapper">

                    <div className="auth-mobile-brand">
                        <div className="auth-brand-icon">
                            <Sparkles size={18} />
                        </div>

                        <span>HireSense</span>
                    </div>

                    <div className="auth-heading">

                        <span className="auth-welcome">
                            WELCOME BACK
                        </span>

                        <h2>Sign in to your account</h2>

                        <p>
                            Continue your journey toward career growth.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <div className="input-wrapper">

                                <Mail size={18} />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <Lock size={18} />

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="auth-btn"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={18} />
                        </button>

                    </form>


                    <p className="auth-switch">
                        Don't have an account?
                        <a href="/signup">Create an account</a>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;