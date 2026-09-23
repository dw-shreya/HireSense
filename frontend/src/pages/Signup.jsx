import "../auth.css";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import API from "../services/api";

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/signup",
                formData
            );

            alert("Account created successfully!");
            console.log(response.data);

        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="auth-page">

            {/* LEFT SIDE */}

            <div className="auth-visual">

                <div className="auth-brand">

                    <div className="auth-brand-icon">
                        <Sparkles size={20} />
                    </div>

                    <span>HireSense</span>

                </div>


                <div className="auth-visual-content">

                    <span className="auth-eyebrow">
                        START YOUR JOURNEY
                    </span>

                    <h1>
                        Your career
                        <br />
                        <span>starts here.</span>
                    </h1>

                    <p>
                        Build a stronger professional profile,
                        discover the skills you need, and turn
                        your career goals into measurable progress.
                    </p>

                </div>


                <div className="auth-visual-footer">

                    <span>AI Resume Analysis</span>
                    <span>•</span>
                    <span>Skill Gap Detection</span>
                    <span>•</span>
                    <span>Career Roadmaps</span>

                </div>

            </div>


            {/* RIGHT SIDE */}

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
                            GET STARTED
                        </span>

                        <h2>Create your account</h2>

                        <p>
                            Start building your path toward career growth.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        {/* NAME */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Name
                            </label>

                            <div className="input-wrapper">

                                <User size={18} />

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

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


                        {/* PASSWORD */}

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
                                    placeholder="Create a password"
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
                            <span>Create Account</span>
                            <ArrowRight size={18} />
                        </button>

                    </form>


                    <p className="auth-switch">

                        Already have an account?

                        <a href="/login">
                            Sign in
                        </a>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;