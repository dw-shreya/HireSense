
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Roadmap from "../components/Dashboard/goals/Roadmap";

function GoalDetails() {
    const { id } = useParams();

    const [goal, setGoal] = useState(null);
    const [skillGaps, setSkillGaps] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showTaskForm, setShowTaskForm] = useState(false);

    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        skill: "",
    });

    // =========================
    // ROADMAP STATE
    // =========================

    const [roadmap, setRoadmap] = useState(null);
    const [roadmapLoading, setRoadmapLoading] = useState(false);
    const [roadmapError, setRoadmapError] = useState("");

    // =========================
    // FETCH GOAL DATA
    // =========================

    const fetchGoalData = async () => {
        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Get goals
            const goalsResponse = await API.get(
                "/goals",
                config
            );

            const foundGoal =
                goalsResponse.data.goals.find(
                    (item) => item._id === id || item.id === id
                );

            if (!foundGoal) {
                setError("Goal not found.");
                return;
            }

            console.log("Goal from API:", foundGoal);

            setGoal(foundGoal);

            if (foundGoal.roadmap?.roadmap) {
                setRoadmap(foundGoal.roadmap.roadmap);
            }

            // =========================
            // GET SKILL GAPS
            // =========================

            const skillGapResponse = await API.get(
                `/goals/${id}/skill-gaps`,
                config
            );

            setSkillGaps(
                skillGapResponse.data.skillGaps || []
            );

            // =========================
            // GET TASKS
            // =========================

            const tasksResponse = await API.get(
                `/tasks/${id}`,
                config
            );

            setTasks(
                tasksResponse.data.tasks || []
            );

        } catch (error) {
            console.error(
                "Goal Details Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load goal."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoalData();
    }, [id]);

    // =========================
    // GENERATE AI ROADMAP
    // =========================

    const generateRoadmap = async () => {
        try {
            setRoadmapLoading(true);
            setRoadmapError("");

            const token = localStorage.getItem("token");

            const response = await API.post(
                `/goals/${id}/generate-roadmap`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "Roadmap API Response:",
                response.data
            );

            setRoadmap(
                response.data.roadmap?.roadmap || []
            );

        } catch (error) {
            console.error(
                "Generate Roadmap Error:",
                error
            );

            setRoadmapError(
                error.response?.data?.message ||
                "Failed to generate roadmap."
            );
        } finally {
            setRoadmapLoading(false);
        }
    };

    // =========================
    // CREATE TASK
    // =========================

    const createTask = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await API.post(
                `/tasks/${id}`,
                taskForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Add new task to existing list
            setTasks((prevTasks) => [
                response.data.task,
                ...prevTasks,
            ]);

            // Reset form
            setTaskForm({
                title: "",
                description: "",
                skill: "",
            });

            // Close form
            setShowTaskForm(false);

        } catch (error) {
            console.error(
                "Create Task Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create task."
            );
        }
    };

    // =========================
    // UPDATE TASK STATUS
    // =========================

    const updateTaskStatus = async (taskId, status) => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.patch(
                `/tasks/${taskId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update task in UI
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId
                        ? response.data.task
                        : task
                )
            );

            // Update goal progress immediately
            setGoal((prevGoal) => ({
                ...prevGoal,
                progress:
                    response.data.goalProgress,
                status:
                    response.data.goalProgress === 100
                        ? "completed"
                        : "active",
            }));

        } catch (error) {
            console.error(
                "Update Task Status Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update task status."
            );
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="dashboard-page">
                    <p>
                        Loading goal...
                    </p>
                </div>
            </>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <>
                <Navbar />

                <div className="dashboard-page">
                    <p>
                        {error}
                    </p>
                </div>
            </>
        );
    }

    // =========================
    // PAGE
    // =========================

    return (
        <>
            <Navbar />

            <div className="dashboard-page">

                {/* ========================= */}
                {/* GOAL HEADER */}
                {/* ========================= */}

                <div className="dashboard-header">
                    <div>
                        <h1>
                            {goal.title}
                        </h1>

                        <p>
                            Target Role: {goal.targetRole}
                        </p>
                    </div>
                </div>

                {/* ========================= */}
                {/* GOAL PROGRESS */}
                {/* ========================= */}

                <div className="dashboard-section">

                    <h2>
                        Goal Progress
                    </h2>

                    <strong>
                        {goal.progress}%
                    </strong>

                    <div className="goal-progress">
                        <div
                            className="goal-progress-fill"
                            style={{
                                width: `${goal.progress}%`,
                            }}
                        />
                    </div>

                    <p>
                        Status: {goal.status}
                    </p>

                </div>

                {/* ========================= */}
                {/* SKILL GAPS */}
                {/* ========================= */}

                <div className="dashboard-section">

                    <h2>
                        Skill Gaps
                    </h2>

                    {skillGaps.length === 0 ? (

                        <p>
                            No skill gaps for this goal.
                        </p>

                    ) : (

                        <div className="skill-gap-list">

                            {skillGaps.map(
                                (skill, index) => (

                                    <div
                                        key={index}
                                        className="skill-gap-item"
                                    >
                                        <span>
                                            {skill}
                                        </span>
                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

                {/* ========================= */}
                {/* AI ROADMAP */}
                {/* ========================= */}

                <div className="dashboard-section">

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >

                        <div>

                            <h2>
                                AI Career Roadmap
                            </h2>

                            <p>
                                Generate a personalized learning
                                roadmap based on your target role
                                and current skills.
                            </p>

                        </div>

                        <button
                            onClick={generateRoadmap}
                            disabled={roadmapLoading}
                        >
                            {roadmapLoading
                                ? "Generating..."
                                : roadmap
                                    ? "Regenerate Roadmap"
                                    : "Generate Roadmap"
                            }
                        </button>

                    </div>

                    {/* ROADMAP ERROR */}

                    {roadmapError && (
                        <p>
                            {roadmapError}
                        </p>
                    )}

                    {/* ROADMAP */}

                    {roadmap && roadmap.length > 0 && (
                        <Roadmap
                            roadmap={roadmap}
                            goalId={id}
                            onTaskAdded={(newTask) => {
                                setTasks((prevTasks) => [
                                    newTask,
                                    ...prevTasks,
                                ]);
                            }}
                        />
                    )}

                    {/* ========================= */}
                    {/* TASKS */}
                    {/* ========================= */}

                    <div className="dashboard-section">

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >

                            <h2>
                                Learning Tasks
                            </h2>

                            <button
                                onClick={() =>
                                    setShowTaskForm(
                                        !showTaskForm
                                    )
                                }
                            >
                                {showTaskForm
                                    ? "Cancel"
                                    : "Create Task"
                                }
                            </button>

                        </div>

                        {/* CREATE TASK FORM */}

                        {showTaskForm && (
                            <form
                                onSubmit={createTask}
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Task title"
                                        value={
                                            taskForm.title
                                        }
                                        onChange={(e) =>
                                            setTaskForm({
                                                ...taskForm,
                                                title:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Task description"
                                        value={
                                            taskForm.description
                                        }
                                        onChange={(e) =>
                                            setTaskForm({
                                                ...taskForm,
                                                description:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Skill"
                                        value={
                                            taskForm.skill
                                        }
                                        onChange={(e) =>
                                            setTaskForm({
                                                ...taskForm,
                                                skill:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <button type="submit">
                                    Create Task
                                </button>

                            </form>
                        )}

                        {/* TASK LIST */}

                        {tasks.length === 0 ? (

                            <p>
                                No tasks created yet.
                            </p>

                        ) : (

                            <div className="task-list">

                                {tasks.map(
                                    (task) => (

                                        <div
                                            key={task._id}
                                            className="task-card"
                                        >

                                            <h3>
                                                {task.title}
                                            </h3>

                                            {task.description && (
                                                <p>
                                                    {
                                                        task.description
                                                    }
                                                </p>
                                            )}

                                            <span>
                                                Skill:{" "}
                                                {task.skill}
                                            </span>

                                            <div className="task-status">

                                                <span>
                                                    Status:{" "}
                                                    {task.status}
                                                </span>

                                                {task.status !== "in-progress" && (
                                                    <button
                                                        onClick={() =>
                                                            updateTaskStatus(
                                                                task._id,
                                                                "in-progress"
                                                            )
                                                        }
                                                    >
                                                        In Progress
                                                    </button>
                                                )}

                                                {task.status !== "completed" && (
                                                    <button
                                                        onClick={() =>
                                                            updateTaskStatus(
                                                                task._id,
                                                                "completed"
                                                            )
                                                        }
                                                    >
                                                        Complete
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default GoalDetails;

