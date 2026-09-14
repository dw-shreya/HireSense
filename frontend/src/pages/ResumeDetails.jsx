import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

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

            console.error("Delete Resume Error:", error);

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
            <div className="details-page">
                <p>Loading resume...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="details-page">
                <h1>{error}</h1>
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="details-page">
                <h1>Resume not found.</h1>
            </div>
        );
    }

    return (
        <div className="details-page">

            {/* Header */}

            <div className="details-header">

                <div>

                    <button
                        className="back-btn"
                        onClick={() => navigate("/history")}
                    >
                        ← Back to History
                    </button>

                    <h1>{resume.fileName}</h1>

                    <p>
                        Resume analysis and AI recommendations
                    </p>

                </div>

                <button
                    className="delete-btn"
                    onClick={handleDelete}
                >
                    Delete Resume
                </button>

            </div>


            {/* ATS Score */}

            <div className="ats-score-card">

                <div>

                    <span>ATS Score</span>

                    <strong>
                        {resume.atsScore}
                    </strong>

                    <p>
                        Overall resume compatibility score
                    </p>

                </div>

            </div>


            {/* Summary */}

            <div className="details-card">

                <h2>Summary</h2>

                <p>
                    {resume.summary}
                </p>

            </div>


            {/* Skills */}

            <div className="details-grid">

                <div className="details-card">

                    <h2>Skills</h2>

                    <div className="tag-list">

                        {resume.skills.map(
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

                    <h2>Missing Skills</h2>

                    <div className="tag-list">

                        {resume.missingSkills.map(
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


            {/* Strengths */}

            <div className="details-card">

                <h2>Strengths</h2>

                <ul className="details-list">

                    {resume.strengths.map(
                        (strength, index) => (
                            <li key={index}>
                                {strength}
                            </li>
                        )
                    )}

                </ul>

            </div>


            {/* Improvements */}

            <div className="details-card">

                <h2>Improvements</h2>

                <ul className="details-list">

                    {resume.improvements.map(
                        (improvement, index) => (
                            <li key={index}>
                                {improvement}
                            </li>
                        )
                    )}

                </ul>

            </div>

        </div>
    );
}

export default ResumeDetails;