import { useState } from "react";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import ResultSection from "../components/ResultSection";
import LoadingAI from "../components/LoadingAI";

import {
    FileText,
    Search,
    Target,
    Route,
    TrendingUp,
    Brain,
    BarChart3,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

function Landing() {
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="landing-page">

            <Header />

            <section
                className="analyzer-section"
                id="resume-analyzer"
            >

                <div className="analyzer-heading">

                    <span>RESUME ANALYSIS</span>

                    <h2>
                        Turn your resume into
                        <br />
                        <strong>actionable insights.</strong>
                    </h2>

                    <p>
                        Upload your resume and let HireSense analyze
                        your experience, skills, ATS compatibility,
                        and areas for improvement.
                    </p>

                </div>

                <UploadSection
                    setShowResult={setShowResult}
                    loading={loading}
                    setLoading={setLoading}
                    setResult={setResult}
                />

                {loading && <LoadingAI />}

                {showResult && (
                    <ResultSection result={result} />
                )}

                <section
                    className="how-it-works"
                    id="how-it-works"
                >
                    <div className="section-heading">

                        <span>HOW IT WORKS</span>

                        <h2>
                            From resume to
                            <strong> career growth.</strong>
                        </h2>

                        <p>
                            HireSense turns your resume into a personalized
                            journey for building the skills and experience
                            you need for your career.
                        </p>

                    </div>


                    <div className="steps-grid">

                        <div className="step-card">

                            <div className="step-icon step-icon-blue">
                                <FileText size={25} />
                            </div>

                            <span className="step-number">
                                01
                            </span>

                            <h3>
                                Analyze Your Resume
                            </h3>

                            <p>
                                Understand your ATS score, existing skills,
                                strengths, and areas that need improvement.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-icon step-icon-teal">
                                <Search size={25} />
                            </div>

                            <span className="step-number">
                                02
                            </span>

                            <h3>
                                Identify Skill Gaps
                            </h3>

                            <p>
                                Discover the skills you are missing for the
                                career direction you want to pursue.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-icon step-icon-purple">
                                <Target size={25} />
                            </div>

                            <span className="step-number">
                                03
                            </span>

                            <h3>
                                Set Career Goals
                            </h3>

                            <p>
                                Define your target role and the skills you
                                want to develop.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-icon step-icon-blue">
                                <Route size={25} />
                            </div>

                            <span className="step-number">
                                04
                            </span>

                            <h3>
                                Follow Your AI Roadmap
                            </h3>

                            <p>
                                Get a practical learning roadmap with
                                hands-on tasks designed around your goals.
                            </p>

                        </div>


                        <div className="step-card">

                            <div className="step-icon step-icon-amber">
                                <TrendingUp size={25} />
                            </div>

                            <span className="step-number">
                                05
                            </span>

                            <h3>
                                Track Your Progress
                            </h3>

                            <p>
                                Complete tasks, monitor your growth, and
                                continuously improve your career profile.
                            </p>

                        </div>

                    </div>
                </section>

                <section className="features-section">

                    <div className="section-heading">

                        <span>BUILT FOR YOUR CAREER</span>

                        <h2>
                            Everything you need to
                            <strong> grow.</strong>
                        </h2>

                        <p>
                            HireSense brings resume intelligence, career planning,
                            and progress tracking together in one place.
                        </p>

                    </div>


                    <div className="features-grid">

                        {/* Feature 01 */}

                        <div className="feature-card">

                            <div className="feature-icon feature-icon-blue">
                                <Brain size={24} />
                            </div>

                            <span className="feature-number">
                                01
                            </span>

                            <h3>
                                AI Resume Analysis
                            </h3>

                            <p>
                                Get intelligent insights into your resume with
                                personalized recommendations for improving your
                                professional profile.
                            </p>

                        </div>


                        {/* Feature 02 */}

                        <div className="feature-card">

                            <div className="feature-icon feature-icon-teal">
                                <BarChart3 size={24} />
                            </div>

                            <span className="feature-number">
                                02
                            </span>

                            <h3>
                                ATS Score Tracking
                            </h3>

                            <p>
                                Understand how your resume performs against
                                applicant tracking systems and track your score
                                over time.
                            </p>

                        </div>


                        {/* Feature 03 */}

                        <div className="feature-card">

                            <div className="feature-icon feature-icon-purple">
                                <Search size={24} />
                            </div>

                            <span className="feature-number">
                                03
                            </span>

                            <h3>
                                Skill Gap Detection
                            </h3>

                            <p>
                                Identify the skills you are missing and understand
                                what you need to develop for your target career.
                            </p>

                        </div>


                        {/* Feature 04 */}

                        <div className="feature-card">

                            <div className="feature-icon feature-icon-amber">
                                <Target size={24} />
                            </div>

                            <span className="feature-number">
                                04
                            </span>

                            <h3>
                                Career Goals
                            </h3>

                            <p>
                                Set specific career goals, define your target role,
                                and turn your ambitions into measurable progress.
                            </p>

                        </div>


                        {/* Feature 05 */}

                        <div className="feature-card feature-card-featured">

                            <div className="feature-icon feature-icon-blue">
                                <Sparkles size={24} />
                            </div>

                            <span className="feature-number">
                                05
                            </span>

                            <h3>
                                AI Career Roadmap
                            </h3>

                            <p>
                                Follow a personalized AI-generated roadmap with
                                practical skills and hands-on tasks designed around
                                your career goals.
                            </p>

                            <div className="feature-highlight">
                                <CheckCircle2 size={16} />
                                Personalized learning path
                            </div>

                        </div>


                        {/* Feature 06 */}

                        <div className="feature-card">

                            <div className="feature-icon feature-icon-teal">
                                <TrendingUp size={24} />
                            </div>

                            <span className="feature-number">
                                06
                            </span>

                            <h3>
                                Progress Tracking
                            </h3>

                            <p>
                                Track completed tasks, monitor your career growth,
                                and see how your efforts translate into measurable
                                improvement.
                            </p>

                        </div>

                    </div>

                    <section className="career-loop">

                        <div className="section-heading">

                            <span>THE HIRESENSE LOOP</span>

                            <h2>
                                Don't just improve your resume.
                                <strong> Improve yourself.</strong>
                            </h2>

                            <p>
                                HireSense turns resume feedback into a continuous
                                career development cycle that helps you build,
                                learn, and grow.
                            </p>

                        </div>


                        <div className="loop-container">

                            <div className="loop-step">
                                <span>01</span>
                                <h3>Analyze</h3>
                                <p>Your resume</p>
                            </div>

                            <div className="loop-arrow">→</div>


                            <div className="loop-step">
                                <span>02</span>
                                <h3>Identify</h3>
                                <p>Skill gaps</p>
                            </div>

                            <div className="loop-arrow">→</div>


                            <div className="loop-step">
                                <span>03</span>
                                <h3>Set Goals</h3>
                                <p>Your target role</p>
                            </div>

                            <div className="loop-arrow">→</div>


                            <div className="loop-step loop-step-featured">
                                <span>04</span>
                                <h3>AI Roadmap</h3>
                                <p>Your learning path</p>
                            </div>

                            <div className="loop-arrow">→</div>


                            <div className="loop-step">
                                <span>05</span>
                                <h3>Learn & Build</h3>
                                <p>Practical tasks</p>
                            </div>

                            <div className="loop-arrow">→</div>


                            <div className="loop-step">
                                <span>06</span>
                                <h3>Track Progress</h3>
                                <p>Keep improving</p>
                            </div>

                        </div>


                        <div className="loop-bottom">

                            <span>
                                ↻
                            </span>

                            <p>
                                Update your resume and start the cycle again.
                            </p>

                        </div>

                    </section>

                </section>

            </section>

        </div>
    );
}

export default Landing;