import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeHistory() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previousResume, setPreviousResume] = useState("");
    const [latestResume, setLatestResume] = useState("");
    const [comparison, setComparison] = useState(null);
    const [comparisonLoading, setComparisonLoading] = useState(false);
    const [comparisonError, setComparisonError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/resumes/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setResumes(response.data.resumes);

            } catch (error) {

                console.error("History Error:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchHistory();

    }, []);

    const compareResumes = async () => {
        if (!previousResume || !latestResume) {
            setComparisonError(
                "Please select both resumes."
            );
            return;
        }

        if (previousResume === latestResume) {
            setComparisonError(
                "Please select two different resumes."
            );
            return;
        }

        try {
            setComparisonLoading(true);
            setComparisonError("");
            setComparison(null);

            const token = localStorage.getItem("token");

            const response = await API.get(
                `/resumes/compare?previousId=${previousResume}&latestId=${latestResume}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "Resume Comparison:",
                response.data
            );

            setComparison(
                response.data.comparison
            );

        } catch (error) {
            console.error(
                "Resume Comparison Error:",
                error
            );

            setComparisonError(
                error.response?.data?.message ||
                "Failed to compare resumes."
            );

        } finally {
            setComparisonLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="history-page">
                <h1>Resume History</h1>
                <p>Loading your resumes...</p>
            </div>
        );
    }

    return (
        <>

            <Navbar />

            <div className="history-page">

                <div className="history-header">

                    <div>
                        <h1>Resume History</h1>

                        <p>
                            Review your previous resume analyses
                            and track your progress.
                        </p>
                    </div>

                    <button
                        className="history-upload-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Analyze New Resume
                    </button>

                </div>

                <div className="comparison-section">

                    <h2>Compare Resumes</h2>

                    <div className="comparison-controls">

                        <div>
                            <label>Previous Resume</label>

                            <select
                                value={previousResume}
                                onChange={(e) =>
                                    setPreviousResume(e.target.value)
                                }
                            >
                                <option value="">
                                    Select previous resume
                                </option>

                                {resumes.map((resume) => (
                                    <option
                                        key={resume._id}
                                        value={resume._id}
                                    >
                                        {resume.fileName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Latest Resume</label>

                            <select
                                value={latestResume}
                                onChange={(e) =>
                                    setLatestResume(e.target.value)
                                }
                            >
                                <option value="">
                                    Select latest resume
                                </option>

                                {resumes.map((resume) => (
                                    <option
                                        key={resume._id}
                                        value={resume._id}
                                    >
                                        {resume.fileName}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <button
                        onClick={compareResumes}
                        disabled={comparisonLoading}
                    >
                        {comparisonLoading
                            ? "Comparing..."
                            : "Compare Resumes"}
                    </button>

                </div>

                {comparison && (
                    <div className="comparison-result">

                        <h2>Resume Comparison Result</h2>

                        <div className="comparison-scores">

                            <div>
                                <span>Previous ATS Score</span>
                                <strong>
                                    {comparison.previous.atsScore}
                                </strong>
                            </div>

                            <div>
                                <span>Latest ATS Score</span>
                                <strong>
                                    {comparison.latest.atsScore}
                                </strong>
                            </div>

                            <div>
                                <span>ATS Improvement</span>
                                <strong>
                                    {comparison.changes.atsImprovement > 0
                                        ? `+${comparison.changes.atsImprovement}`
                                        : comparison.changes.atsImprovement}
                                </strong>
                            </div>

                        </div>

                        <div className="comparison-details">

                            <div>
                                <h3>New Skills</h3>

                                {comparison.changes.newSkills.length > 0 ? (
                                    <ul>
                                        {comparison.changes.newSkills.map(
                                            (skill, index) => (
                                                <li key={index}>
                                                    {skill}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p>No new skills added.</p>
                                )}
                            </div>


                            <div>
                                <h3>Removed Skills</h3>

                                {comparison.changes.removedSkills.length > 0 ? (
                                    <ul>
                                        {comparison.changes.removedSkills.map(
                                            (skill, index) => (
                                                <li key={index}>
                                                    {skill}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p>No skills removed.</p>
                                )}
                            </div>


                            <div>
                                <h3>Missing Skills Reduced</h3>

                                <strong>
                                    {comparison.changes.missingSkillsReduced}
                                </strong>
                            </div>

                        </div>

                    </div>
                )}

                {resumes.length === 0 ? (

                    <div className="empty-history">

                        <h2>No resumes yet</h2>

                        <p>
                            Upload your first resume to start
                            tracking your ATS performance.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                        >
                            Analyze Resume
                        </button>

                    </div>

                ) : (

                    <div className="resume-history-list">

                        {resumes.map((resume) => (

                            <div
                                className="resume-history-card"
                                key={resume._id}
                            >

                                <div className="resume-info">

                                    <h2>
                                        {resume.fileName}
                                    </h2>

                                    <p>
                                        Analyzed on{" "}
                                        {new Date(
                                            resume.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>


                                <div className="resume-score">

                                    <span>ATS Score</span>

                                    <strong>
                                        {resume.atsScore}
                                    </strong>

                                </div>


                                <button
                                    className="view-resume-btn"
                                    onClick={() =>
                                        navigate(
                                            `/resume/${resume._id}`
                                        )
                                    }
                                >
                                    View Resume →
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default ResumeHistory;