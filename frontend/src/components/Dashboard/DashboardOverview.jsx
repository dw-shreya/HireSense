import {
    FileText,
    Trophy,
    BarChart3,
    Activity,
    TrendingUp,
} from "lucide-react";

function DashboardOverview({ dashboardData }) {

    return (
        <div className="dashboard-section">

            <h2>Overview</h2>

            <div className="analytics-grid">

                <div className="analytics-card">
                    <div className="analytics-card-top">
                        <div className="analytics-icon analytics-icon-blue">
                            <FileText size={20} />
                        </div>

                        <span>Total Resumes</span>
                    </div>

                    <strong>
                        {dashboardData.totalResumes}
                    </strong>
                </div>


                <div className="analytics-card">
                    <div className="analytics-card-top">
                        <div className="analytics-icon analytics-icon-amber">
                            <Trophy size={20} />
                        </div>

                        <span>Highest ATS</span>
                    </div>

                    <strong>
                        {dashboardData.highestATS}
                    </strong>
                </div>


                <div className="analytics-card">
                    <div className="analytics-card-top">
                        <div className="analytics-icon analytics-icon-purple">
                            <BarChart3 size={20} />
                        </div>

                        <span>Average ATS</span>
                    </div>

                    <strong>
                        {dashboardData.averageATS}
                    </strong>
                </div>


                <div className="analytics-card">
                    <div className="analytics-card-top">
                        <div className="analytics-icon analytics-icon-teal">
                            <Activity size={20} />
                        </div>

                        <span>Latest ATS</span>
                    </div>

                    <strong>
                        {dashboardData.latestATS}
                    </strong>
                </div>


                <div className="analytics-card analytics-card-highlight">
                    <div className="analytics-card-top">
                        <div className="analytics-icon analytics-icon-blue">
                            <TrendingUp size={20} />
                        </div>

                        <span>ATS Improvement</span>
                    </div>

                    <strong>
                        {dashboardData.atsImprovement > 0
                            ? `+${dashboardData.atsImprovement}`
                            : dashboardData.atsImprovement}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default DashboardOverview;