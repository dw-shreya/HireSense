import {
    BookOpen,
    CheckCircle2,
    ListChecks,
} from "lucide-react";

function LearningProgress({ dashboardData }) {

    const totalTasks = dashboardData?.totalTasks || 0;
    const completedTasks = dashboardData?.completedTasks || 0;
    const completionRate =
        dashboardData?.taskCompletionRate || 0;

    return (
        <div className="learning-progress">

            <div className="learning-header">

                <div>

                    <div className="dashboard-card-title">

                        <div className="dashboard-small-icon dashboard-icon-teal">
                            <BookOpen size={18} />
                        </div>

                        <h3>
                            Learning Progress
                        </h3>

                    </div>

                    <p>
                        Track how much of your learning plan
                        you have completed.
                    </p>

                </div>

            </div>


            {/* Task Summary */}

            <div className="learning-summary">

                <div className="learning-stat">

                    <div className="learning-stat-icon">
                        <ListChecks size={17} />
                    </div>

                    <div>
                        <span>
                            Total Tasks
                        </span>

                        <strong>
                            {totalTasks}
                        </strong>
                    </div>

                </div>


                <div className="learning-stat">

                    <div className="learning-stat-icon learning-stat-icon-green">
                        <CheckCircle2 size={17} />
                    </div>

                    <div>
                        <span>
                            Completed
                        </span>

                        <strong>
                            {completedTasks}
                        </strong>
                    </div>

                </div>


                <div className="learning-stat learning-rate">

                    <div>
                        <span>
                            Completion Rate
                        </span>

                        <strong>
                            {completionRate}%
                        </strong>
                    </div>

                </div>

            </div>


            {/* Progress */}

            <div className="learning-progress-container">

                <div className="learning-progress-label">

                    <span>
                        Overall Progress
                    </span>

                    <strong>
                        {completionRate}%
                    </strong>

                </div>

                <div className="learning-progress-bar">

                    <div
                        className="learning-progress-fill"
                        style={{
                            width: `${completionRate}%`,
                        }}
                    />

                </div>

            </div>


            <p className="learning-completion-text">
                {completedTasks} of {totalTasks} tasks completed
            </p>

        </div>
    );
}

export default LearningProgress;