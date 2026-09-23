import React, { useState } from "react";
import { Upload, ArrowRight } from "lucide-react";
import API from "../services/api";

const UploadSection = ({
    setShowResult,
    loading,
    setLoading,
    setResult,
}) => {

    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            setMessage("Please upload a valid PDF file.");
            setResume(null);
            setShowResult(false);
            event.target.value = "";
            return;
        }

        setResume(file);
        setMessage("");
        setShowResult(false);
    };

    const handleAnalyze = async () => {
        if (!resume) {
            setMessage("Please upload a PDF.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("resume", resume);

            const token = localStorage.getItem("token");

            console.log("JWT Token:", token);

            const response = await API.post(
                "/resumes/analyze",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const data = response.data;

            console.log("Analyze Response:", data);

            setResult(data);
            setShowResult(true);

        }
        catch (error) {
            console.error(error);

            if (error.name === "TypeError") {
                setMessage(
                    "The AI server is waking up. Please wait about a minute and try again."
                );
            } else {
                setMessage(
                    "We couldn't analyze your resume this time. Please try again in a few seconds."
                );
            }
        }

        finally {
            setLoading(false);
        }


    };

    return (
        <div className="dashboard-upload">

            <div className="dashboard-upload-card">

                <div className="dashboard-upload-header">

                    <div className="dashboard-upload-icon">
                        <Upload size={24} />
                    </div>

                    <div>
                        <h3>Upload Resume</h3>

                        <p>
                            Drag & drop your latest resume or choose a PDF file to generate a fresh AI analysis.
                        </p>
                    </div>

                </div>


                <label
                    htmlFor="resume-upload"
                    className="dashboard-dropzone"
                >

                    <Upload size={42} />

                    <h4>Drop your resume here</h4>

                    <p>
                        PDF only • Maximum 5 MB
                    </p>

                    <span className="browse-btn">
                        Browse Files
                    </span>

                </label>


                <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    hidden
                />


                {resume && (

                    <div className="selected-file-card">

                        <div>

                            <strong>
                                {resume.name}
                            </strong>

                            <p>
                                Ready for analysis
                            </p>

                        </div>

                        <span className="file-ready">
                            PDF
                        </span>

                    </div>

                )}


                <button
                    onClick={handleAnalyze}
                    disabled={!resume || loading}
                    className="analyze-btn"
                >

                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            AI is analyzing...
                        </>
                    ) : (
                        <>
                            Analyze Resume
                            <ArrowRight size={18} />
                        </>
                    )}

                </button>


                {loading && (

                    <div className="message info">

                        🚀 First request? The AI server may take around 60 seconds to wake up.

                    </div>

                )}


                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}

export default UploadSection;