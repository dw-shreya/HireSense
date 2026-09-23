import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Trash2,
    FileText,
    CheckCircle2,
    AlertTriangle,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/resumes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/history");

        } catch (error) {

            console.error(
                "Delete Resume Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete resume."
            );
        }
    };


    useEffect(() => {

        const fetchResume = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    `/resumes/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setResume(response.data.resume);

            } catch (error) {

                console.error(
                    "Resume Details Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load resume."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchResume();

    }, [id]);


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="details-page">

                    <div className="details-state">

                        <div className="details-state-icon">
                            <FileText size={24} />
                        </div>

                        <h2>
                            Loading resume analysis...
                        </h2>

                        <p>
                            Preparing your AI-generated insights.
                        </p>

                    </div>

                </div>
            </>
        );

    }


    if (error) {

        return (
            <>
                <Navbar />

                <div className="details-page">

                    <div className="details-state">

                        <div className="details-state-icon details-state-error">
                            <AlertTriangle size={24} />
                        </div>

                        <h2>
                            {error}
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/history")
                            }
                            className="details-state-btn"
                        >
                            <ArrowLeft size={16} />
                            Back to History
                        </button>

                    </div>

                </div>
            </>
        );

    }


    if (!resume) {

        return (
            <>
                <Navbar />

                <div className="details-page">

                    <div className="details-state">

                        <div className="details-state-icon">
                            <FileText size={24} />
                        </div>

                        <h2>
                            Resume not found.
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/history")
                            }
                            className="details-state-btn"
                        >
                            <ArrowLeft size={16} />
                            Back to History
                        </button>

                    </div>

                </div>
            </>
        );

    }


    return (
        <>
            <Navbar />

            <div className="details-page">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="details-header">

                    <div className="details-header-left">

                        <button
                            className="back-btn"
                            onClick={() =>
                                navigate("/history")
                            }
                        >
                            <ArrowLeft size={16} />
                            Back to History
                        </button>


                        <div className="details-title-row">

                            <div className="details-file-icon">
                                <FileText size={22} />
                            </div>

                            <div>

                                <span className="details-eyebrow">
                                    RESUME ANALYSIS
                                </span>

                                <h1>
                                    {resume.fileName}
                                </h1>

                                <p>
                                    AI-powered resume insights
                                    and recommendations
                                </p>

                            </div>

                        </div>

                    </div>


                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        <Trash2 size={16} />
                        Delete Resume
                    </button>

                </div>


                {/* =========================
                    ATS SCORE
                ========================= */}

                <div className="ats-score-card">

                    <div className="ats-score-content">

                        <div>

                            <span className="ats-score-label">
                                ATS SCORE
                            </span>

                            <h2>
                                Resume Compatibility
                            </h2>

                            <p>
                                Your resume's overall compatibility
                                with applicant tracking systems.
                            </p>

                        </div>


                        <div className="ats-score-display">

                            <div className="ats-score-circle">

                                <strong>
                                    {resume.atsScore}
                                </strong>

                                <span>
                                    / 100
                                </span>

                            </div>

                            <div className="ats-score-status">

                                <TrendingUp size={16} />

                                <span>
                                    Current Score
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SUMMARY
                ========================= */}

                <div className="details-card details-summary-card">

                    <div className="details-card-heading">

                        <div className="details-section-icon details-icon-blue">
                            <Sparkles size={18} />
                        </div>

                        <div>

                            <h2>
                                AI Resume Summary
                            </h2>

                            <p>
                                A quick overview of your professional profile.
                            </p>

                        </div>

                    </div>

                    <p className="summary-text">
                        {resume.summary}
                    </p>

                </div>


                {/* =========================
                    SKILLS
                ========================= */}

                <div className="details-grid">

                    <div className="details-card">

                        <div className="details-card-heading">

                            <div className="details-section-icon details-icon-green">
                                <CheckCircle2 size={18} />
                            </div>

                            <div>

                                <h2>
                                    Skills
                                </h2>

                                <p>
                                    Skills identified in your resume.
                                </p>

                            </div>

                        </div>


                        <div className="tag-list">

                            {resume.skills?.map(
                                (skill, index) => (

                                    <span
                                        className="skill-tag"
                                        key={index}
                                    >
                                        {skill}
                                    </span>

                                )
                            )}

                        </div>

                    </div>


                    {/* Missing Skills */}

                    <div className="details-card">

                        <div className="details-card-heading">

                            <div className="details-section-icon details-icon-amber">
                                <AlertTriangle size={18} />
                            </div>

                            <div>

                                <h2>
                                    Missing Skills
                                </h2>

                                <p>
                                    Skills worth developing for your profile.
                                </p>

                            </div>

                        </div>


                        <div className="tag-list">

                            {resume.missingSkills?.map(
                                (skill, index) => (

                                    <span
                                        className="missing-tag"
                                        key={index}
                                    >
                                        {skill}
                                    </span>

                                )
                            )}

                        </div>

                    </div>

                </div>


                {/* =========================
                    STRENGTHS
                ========================= */}

                <div className="details-card">

                    <div className="details-card-heading">

                        <div className="details-section-icon details-icon-green">
                            <CheckCircle2 size={18} />
                        </div>

                        <div>

                            <h2>
                                Strengths
                            </h2>

                            <p>
                                What your resume is already doing well.
                            </p>

                        </div>

                    </div>


                    <ul className="details-list">

                        {resume.strengths?.map(
                            (strength, index) => (

                                <li key={index}>
                                    <CheckCircle2 size={17} />
                                    <span>
                                        {strength}
                                    </span>
                                </li>

                            )
                        )}

                    </ul>

                </div>


                {/* =========================
                    IMPROVEMENTS
                ========================= */}

                <div className="details-card">

                    <div className="details-card-heading">

                        <div className="details-section-icon details-icon-purple">
                            <Sparkles size={18} />
                        </div>

                        <div>

                            <h2>
                                Improvements
                            </h2>

                            <p>
                                AI recommendations to strengthen your resume.
                            </p>

                        </div>

                    </div>


                    <ul className="details-list details-improvement-list">

                        {resume.improvements?.map(
                            (improvement, index) => (

                                <li key={index}>
                                    <span className="improvement-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span>
                                        {improvement}
                                    </span>
                                </li>

                            )
                        )}

                    </ul>

                </div>

            </div>
        </>
    );
}

export default ResumeDetails;