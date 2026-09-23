import {
    TrendingUp,
    BarChart3,
    ArrowUpRight,
} from "lucide-react";

function ATSProgress({ dashboardData }) {

    const latestATS = dashboardData?.latestATS || 0;
    const previousATS = dashboardData?.previousATS || 0;
    const atsImprovement =
        dashboardData?.atsImprovement || 0;

    const atsHistory =
        dashboardData?.atsHistory || [];

    return (
        <div className="ats-progress">

            {/* Header */}

            <div className="ats-header">

                <div>

                    <div className="dashboard-card-title">

                        <div className="dashboard-small-icon dashboard-icon-blue">
                            <TrendingUp size={18} />
                        </div>

                        <h3>
                            ATS Progress
                        </h3>

                    </div>

                    <p>
                        Track how your resume performance has changed
                        over time.
                    </p>

                </div>

            </div>


            {/* ATS Summary */}

            <div className="ats-summary">

                <div className="ats-stat">

                    <span>
                        Previous ATS
                    </span>

                    <strong>
                        {previousATS}
                    </strong>

                </div>


                <div className="ats-stat ats-stat-current">

                    <span>
                        Latest ATS
                    </span>

                    <strong>
                        {latestATS}
                    </strong>

                </div>


                <div className="ats-stat">

                    <span>
                        Improvement
                    </span>

                    <strong
                        className={
                            atsImprovement > 0
                                ? "ats-positive"
                                : ""
                        }
                    >
                        {atsImprovement > 0
                            ? `+${atsImprovement}`
                            : atsImprovement}
                    </strong>

                </div>

            </div>


            {/* Current ATS */}

            <div className="ats-current">

                <div className="ats-current-header">

                    <div>
                        <span>
                            Current ATS Score
                        </span>

                        <strong>
                            {latestATS}
                            <small>/100</small>
                        </strong>
                    </div>

                    {atsImprovement > 0 && (
                        <div className="ats-improvement-badge">
                            <ArrowUpRight size={14} />
                            +{atsImprovement}
                        </div>
                    )}

                </div>


                <div className="ats-progress-bar">

                    <div
                        className="ats-progress-fill"
                        style={{
                            width: `${latestATS}%`,
                        }}
                    />

                </div>

            </div>


            {/* ATS History */}

            {atsHistory.length > 1 && (

                <div className="ats-history">

                    <div className="ats-history-heading">

                        <h4>
                            Score History
                        </h4>

                        <BarChart3 size={17} />

                    </div>


                    <div className="ats-history-list">

                        {atsHistory.map(
                            (item, index) => (

                                <div
                                    className="ats-history-item"
                                    key={
                                        item.createdAt ||
                                        index
                                    }
                                >

                                    <span>
                                        Resume {index + 1}
                                    </span>

                                    <div className="ats-history-value">

                                        <div className="ats-mini-bar">
                                            <div
                                                style={{
                                                    width: `${item.atsScore}%`,
                                                }}
                                            />
                                        </div>

                                        <strong>
                                            {item.atsScore}
                                        </strong>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default ATSProgress;