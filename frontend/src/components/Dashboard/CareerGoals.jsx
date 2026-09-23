import { useNavigate } from "react-router-dom";
import { Target, CheckCircle2, ArrowRight } from "lucide-react";

function CareerGoals({ dashboardData }) {

    const navigate = useNavigate();

    const goals = dashboardData?.goals || [];

    return (
        <div className="career-goals">

            <div className="career-goals-header">

                <div>
                    <div className="dashboard-card-title">
                        <div className="dashboard-small-icon dashboard-icon-purple">
                            <Target size={18} />
                        </div>

                        <h3>Career Goals</h3>
                    </div>

                    <p>
                        Track your progress toward your target career.
                    </p>
                </div>

                <div className="goal-summary">

                    <span>
                        Active
                        <strong>
                            {dashboardData?.activeGoals || 0}
                        </strong>
                    </span>

                    <span>
                        Completed
                        <strong>
                            {dashboardData?.completedGoals || 0}
                        </strong>
                    </span>

                </div>

            </div>


            {goals.length === 0 ? (

                <div className="empty-dashboard-state">

                    <Target size={28} />

                    <p>
                        No career goals yet.
                    </p>

                </div>

            ) : (

                <div className="career-goal-list">

                    {goals.map((goal) => (

                        <div
                            key={goal.id}
                            className="goal-card"
                            onClick={() =>
                                navigate(`/goals/${goal.id}`)
                            }
                        >

                            <div className="goal-card-heading">

                                <div>
                                    <h3>
                                        {goal.title}
                                    </h3>

                                    <p>
                                        Target Role:{" "}
                                        {goal.targetRole}
                                    </p>
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="goal-arrow"
                                />

                            </div>


                            <div className="goal-progress-header">

                                <span>
                                    Progress
                                </span>

                                <strong>
                                    {goal.progress}%
                                </strong>

                            </div>


                            <div className="goal-progress">

                                <div
                                    className="goal-progress-fill"
                                    style={{
                                        width:
                                            `${goal.progress}%`,
                                    }}
                                />

                            </div>


                            <div className="goal-card-footer">

                                <span
                                    className={`goal-status goal-status-${goal.status}`}
                                >
                                    {goal.status}
                                </span>

                                {goal.progress === 100 && (
                                    <span className="goal-complete">
                                        <CheckCircle2 size={15} />
                                        Completed
                                    </span>
                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default CareerGoals;