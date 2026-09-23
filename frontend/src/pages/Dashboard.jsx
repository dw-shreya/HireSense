import { useEffect, useState } from "react";
import API from "../services/api";

import UploadSection from "../components/UploadSection";
import ResultSection from "../components/ResultSection";
import LoadingAI from "../components/LoadingAI";
import Navbar from "../components/Navbar";

import DashboardOverview from "../components/Dashboard/DashboardOverview";
import CareerGoals from "../components/Dashboard/CareerGoals";
import LearningProgress from "../components/Dashboard/LearningProgress";
import ATSProgress from "../components/Dashboard/ATSProgress";
import SkillGaps from "../components/Dashboard/SkillGaps";


function Dashboard() {

    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dashboardData, setDashboardData] = useState({
        totalResumes: 0,
        highestATS: 0,
        averageATS: 0,
        latestATS: 0,
        previousATS: 0,
        atsImprovement: 0,

        activeGoals: 0,
        completedGoals: 0,

        totalTasks: 0,
        completedTasks: 0,
        taskCompletionRate: 0,

        goals: [],
        atsHistory: [],
        skillGaps: [],
    });


    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await API.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(
                "Dashboard API Response:",
                response.data
            );

            setDashboardData(response.data);

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        }
    };


    useEffect(() => {
        fetchDashboard();
    }, []);


    return (
        <>

            <Navbar />

            <div className="dashboard-page">


                {/* ==================== */}
                {/* HEADER */}
                {/* ==================== */}

                <div className="dashboard-header">

                    <div>
                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Track your resume performance and
                            improve your career profile.
                        </p>
                    </div>

                    <button
                        className="dashboard-analyze-btn"
                        onClick={() =>
                            document
                                .getElementById("resume-analyzer")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        ✨ {dashboardData.totalResumes === 0
                            ? "Analyze Your First Resume"
                            : "Analyze New Resume"}
                    </button>

                </div>


                {/* ==================== */}
                {/* OVERVIEW */}
                {/* ==================== */}

                <DashboardOverview
                    dashboardData={dashboardData}
                />


                {/* ==================== */}
                {/* CAREER PROGRESS */}
                {/* ==================== */}

                <div className="dashboard-section">

                    <h2>
                        Career Progress
                    </h2>


                    {/* Career Goals */}

                    <CareerGoals
                        dashboardData={dashboardData}
                    />


                    {/* Learning Progress */}

                    <LearningProgress
                        dashboardData={dashboardData}
                    />

                </div>


                {/* ==================== */}
                {/* RESUME INSIGHTS */}
                {/* ==================== */}

                <div className="dashboard-section">

                    <h2>
                        Resume Insights
                    </h2>


                    {/* ATS Progress */}

                    <ATSProgress
                        dashboardData={dashboardData}
                    />


                    {/* Skill Gaps */}

                    <SkillGaps
                        dashboardData={dashboardData}
                    />

                </div>


                {/* ==================== */}
                {/* RESUME ANALYSIS */}
                {/* ==================== */}

                <div className="dashboard-section">

                    <h2>
                        Analyze a Resume
                    </h2>

                    <p>
                        Upload your resume and let HireSense
                        analyze your career profile.
                    </p>


                    <UploadSection

                        setShowResult={
                            setShowResult
                        }

                        loading={
                            loading
                        }

                        setLoading={
                            setLoading
                        }

                        setResult={
                            setResult
                        }

                    />

                </div>


                {/* ==================== */}
                {/* LOADING */}
                {/* ==================== */}

                {loading && (
                    <LoadingAI />
                )}


                {/* ==================== */}
                {/* RESULT */}
                {/* ==================== */}

                {showResult && (

                    <div className="dashboard-section">

                        <ResultSection
                            result={result}
                        />

                    </div>

                )}

            </div>

        </>

    );
}


export default Dashboard;