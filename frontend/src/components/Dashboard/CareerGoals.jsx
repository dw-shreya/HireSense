import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Target,
    CheckCircle2,
    ArrowRight,
    Plus,
} from "lucide-react";
import API from "../../services/api";

function CareerGoals({ dashboardData }) {

    const navigate = useNavigate();

    const goals = dashboardData?.goals || [];

    const [showGoalForm, setShowGoalForm] = useState(false);

    const [goalForm, setGoalForm] = useState({
        title: "",
        targetRole: "",
        targetSkills: "",
    });

    const handleCreateGoal = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/goals",
                {
                    title: goalForm.title,
                    targetRole: goalForm.targetRole,
                    targetSkills: goalForm.targetSkills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Goal created successfully!");

            setGoalForm({
                title: "",
                targetRole: "",
                targetSkills: "",
            });

            setShowGoalForm(false);

            window.location.reload();

        } catch (error) {
            console.error(
                "Create Goal Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to create goal."
            );
        }
    };

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

                <div className="career-goals-actions">

                    <button
                        className="create-goal-btn"
                        onClick={() => setShowGoalForm(true)}
                    >
                        <Plus size={15} />
                        Create Goal
                    </button>

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

            </div>


            {showGoalForm && (

                <form
                    className="create-goal-form"
                    onSubmit={handleCreateGoal}
                >

                    <h3>Create Career Goal</h3>

                    <input
                        type="text"
                        placeholder="Goal title"
                        value={goalForm.title}
                        onChange={(e) =>
                            setGoalForm({
                                ...goalForm,
                                title: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Target role"
                        value={goalForm.targetRole}
                        onChange={(e) =>
                            setGoalForm({
                                ...goalForm,
                                targetRole: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Target skills (comma separated)"
                        value={goalForm.targetSkills}
                        onChange={(e) =>
                            setGoalForm({
                                ...goalForm,
                                targetSkills: e.target.value,
                            })
                        }
                    />

                    <div className="create-goal-form-actions">

                        <button type="submit">
                            Create Goal
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowGoalForm(false)}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            )}


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