import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Target,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
    AlertTriangle,
    Route,
    ListChecks,
    Plus,
    Sparkles,
} from "lucide-react";

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

            // =========================
            // GET GOAL
            // =========================

            const goalsResponse = await API.get(
                "/goals",
                config
            );

            const foundGoal =
                goalsResponse.data.goals.find(
                    (item) =>
                        item._id === id ||
                        item.id === id
                );

            if (!foundGoal) {
                setError("Goal not found.");
                return;
            }

            console.log(
                "Goal from API:",
                foundGoal
            );

            setGoal(foundGoal);

            // =========================
            // LOAD SAVED ROADMAP
            // =========================

            if (foundGoal.roadmap?.roadmap) {
                setRoadmap(
                    foundGoal.roadmap.roadmap
                );
            }

            // =========================
            // GET SKILL GAPS
            // =========================

            const skillGapResponse =
                await API.get(
                    `/goals/${id}/skill-gaps`,
                    config
                );

            setSkillGaps(
                skillGapResponse.data.skillGaps ||
                []
            );

            // =========================
            // GET TASKS
            // =========================

            const tasksResponse =
                await API.get(
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

            const token =
                localStorage.getItem("token");

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
                response.data.roadmap?.roadmap ||
                []
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
            const token =
                localStorage.getItem("token");

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

    const updateTaskStatus = async (
        taskId,
        status
    ) => {
        try {
            const token =
                localStorage.getItem("token");

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
                    response.data.goalProgress ===
                        100
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

                <div className="goal-details-page">
                    <div className="goal-details-state">
                        <div className="goal-state-spinner" />
                        <h2>Loading goal...</h2>
                        <p>
                            Preparing your career
                            progress.
                        </p>
                    </div>
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

                <div className="goal-details-page">
                    <div className="goal-details-state goal-error-state">
                        <AlertTriangle
                            size={32}
                        />

                        <h2>
                            Unable to load goal
                        </h2>

                        <p>{error}</p>

                        <button
                            className="goal-back-btn"
                            onClick={() =>
                                window.history.back()
                            }
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>
                    </div>
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

            <div className="goal-details-page">

                {/* ========================= */}
                {/* GOAL HEADER */}
                {/* ========================= */}

                <div className="goal-details-header">

                    <button
                        className="goal-back-btn"
                        onClick={() =>
                            window.history.back()
                        }
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="goal-details-title">

                        <div className="goal-details-icon">
                            <Target size={25} />
                        </div>

                        <div>
                            <span className="goal-details-eyebrow">
                                CAREER GOAL
                            </span>

                            <h1>
                                {goal.title}
                            </h1>

                            <p>
                                Target Role:{" "}
                                <strong>
                                    {goal.targetRole}
                                </strong>
                            </p>
                        </div>

                    </div>
                </div>

                {/* ========================= */}
                {/* GOAL PROGRESS */}
                {/* ========================= */}

                <div className="goal-progress-card">

                    <div className="goal-progress-card-header">

                        <div>
                            <span>
                                GOAL PROGRESS
                            </span>

                            <h2>
                                {goal.progress === 100
                                    ? "Goal completed!"
                                    : "You're making progress"}
                            </h2>
                        </div>

                        <div className="goal-progress-percentage">
                            {goal.progress}%
                        </div>

                    </div>

                    <div className="goal-details-progress">

                        <div
                            className="goal-details-progress-fill"
                            style={{
                                width: `${goal.progress}%`,
                            }}
                        />

                    </div>

                    <div className="goal-progress-footer">

                        <span>
                            Keep completing tasks
                            to move closer to
                            your goal.
                        </span>

                        <span
                            className={`goal-details-status goal-details-status-${goal.status}`}
                        >
                            {goal.status ===
                                "completed" && (
                                    <CheckCircle2
                                        size={14}
                                    />
                                )}

                            {goal.status}
                        </span>

                    </div>
                </div>

                {/* ========================= */}
                {/* SKILL GAPS */}
                {/* ========================= */}

                <div className="goal-skill-section">

                    <div className="goal-section-heading">

                        <div className="goal-section-icon goal-icon-amber">
                            <AlertTriangle
                                size={18}
                            />
                        </div>

                        <div>
                            <span>
                                SKILL DEVELOPMENT
                            </span>

                            <h2>
                                Skill Gaps
                            </h2>

                            <p>
                                Focus on these skills
                                to move closer to
                                your target role.
                            </p>
                        </div>

                    </div>

                    {skillGaps.length === 0 ? (

                        <div className="goal-empty-state">

                            <CheckCircle2
                                size={22}
                            />

                            <div>
                                <strong>
                                    No skill gaps found
                                </strong>

                                <p>
                                    You're currently
                                    aligned with the
                                    skills required
                                    for this goal.
                                </p>
                            </div>

                        </div>

                    ) : (

                        <div className="goal-skill-list">

                            {skillGaps.map(
                                (skill, index) => (

                                    <div
                                        key={index}
                                        className="goal-skill-item"
                                    >

                                        <span className="goal-skill-number">
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <span className="goal-skill-name">
                                            {skill}
                                        </span>

                                        <ArrowRight
                                            size={16}
                                            className="goal-skill-arrow"
                                        />

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* ========================= */}
                {/* AI ROADMAP */}
                {/* ========================= */}

                <div className="goal-roadmap-section">

                    <div className="goal-section-heading roadmap-heading">

                        <div className="goal-section-icon goal-icon-blue">
                            <Route size={18} />
                        </div>

                        <div>
                            <span>
                                AI-POWERED LEARNING
                            </span>

                            <h2>
                                Career Roadmap
                            </h2>

                            <p>
                                A personalized learning
                                path based on your target
                                role and current skills.
                            </p>
                        </div>

                        <button
                            className="generate-roadmap-btn"
                            onClick={generateRoadmap}
                            disabled={roadmapLoading}
                        >
                            <Sparkles size={15} />

                            {roadmapLoading
                                ? "Generating..."
                                : roadmap
                                    ? "Regenerate Roadmap"
                                    : "Generate Roadmap"}
                        </button>

                    </div>

                    {roadmapError && (
                        <div className="goal-roadmap-error">
                            <AlertTriangle
                                size={16}
                            />

                            <span>
                                {roadmapError}
                            </span>
                        </div>
                    )}

                    {roadmap &&
                        roadmap.length > 0 && (
                            <Roadmap
                                roadmap={roadmap}
                                goalId={id}
                                onTaskAdded={(
                                    newTask
                                ) => {
                                    setTasks(
                                        (
                                            prevTasks
                                        ) => [
                                                newTask,
                                                ...prevTasks,
                                            ]
                                    );
                                }}
                            />
                        )}

                    {!roadmap &&
                        !roadmapLoading && (
                            <div className="goal-roadmap-empty">

                                <div className="goal-roadmap-empty-icon">
                                    <Route
                                        size={24}
                                    />
                                </div>

                                <h3>
                                    Build your
                                    personalized roadmap
                                </h3>

                                <p>
                                    Let AI create a
                                    practical learning
                                    path based on your
                                    current skills,
                                    skill gaps, and
                                    career goal.
                                </p>

                                <button
                                    className="generate-roadmap-empty-btn"
                                    onClick={
                                        generateRoadmap
                                    }
                                >
                                    <Sparkles
                                        size={15}
                                    />
                                    Generate My Roadmap
                                </button>

                            </div>
                        )}

                </div>

                {/* ========================= */}
                {/* LEARNING TASKS */}
                {/* ========================= */}

                <div className="goal-tasks-section">

                    <div className="goal-section-heading tasks-heading">

                        <div className="goal-section-icon goal-icon-green">
                            <ListChecks
                                size={18}
                            />
                        </div>

                        <div>
                            <span>
                                ACTION PLAN
                            </span>

                            <h2>
                                Learning Tasks
                            </h2>

                            <p>
                                Turn your roadmap into
                                actionable tasks and
                                track your progress.
                            </p>
                        </div>

                        <button
                            className="create-task-btn"
                            onClick={() =>
                                setShowTaskForm(
                                    !showTaskForm
                                )
                            }
                        >
                            <Plus size={16} />

                            {showTaskForm
                                ? "Cancel"
                                : "Create Task"}
                        </button>

                    </div>

                    {/* ========================= */}
                    {/* CREATE TASK FORM */}
                    {/* ========================= */}

                    {showTaskForm && (

                        <form
                            onSubmit={createTask}
                            className="goal-task-form"
                        >

                            <div className="goal-form-field">

                                <label>
                                    Task Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Build a REST API"
                                    value={
                                        taskForm.title
                                    }
                                    onChange={(e) =>
                                        setTaskForm({
                                            ...taskForm,
                                            title:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    required
                                />

                            </div>

                            <div className="goal-form-field">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    placeholder="Describe what you want to accomplish..."
                                    value={
                                        taskForm.description
                                    }
                                    onChange={(e) =>
                                        setTaskForm({
                                            ...taskForm,
                                            description:
                                                e.target
                                                    .value,
                                        })
                                    }
                                />

                            </div>

                            <div className="goal-form-field">

                                <label>
                                    Skill
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Node.js"
                                    value={
                                        taskForm.skill
                                    }
                                    onChange={(e) =>
                                        setTaskForm({
                                            ...taskForm,
                                            skill:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="save-task-btn"
                            >
                                <CheckCircle2
                                    size={16}
                                />
                                Create Task
                            </button>

                        </form>
                    )}

                    {/* ========================= */}
                    {/* TASK LIST */}
                    {/* ========================= */}

                    {tasks.length === 0 ? (

                        <div className="goal-empty-state">

                            <ListChecks
                                size={22}
                            />

                            <div>
                                <strong>
                                    No learning tasks yet
                                </strong>

                                <p>
                                    Create a task
                                    manually or add
                                    one from your AI
                                    roadmap.
                                </p>
                            </div>

                        </div>

                    ) : (

                        <div className="goal-task-list">

                            {tasks.map((task) => (

                                <div
                                    key={task._id}
                                    className={`goal-task-card goal-task-${task.status}`}
                                >

                                    <div className="goal-task-main">

                                        <div className="goal-task-check">

                                            {task.status ===
                                                "completed" ? (
                                                <CheckCircle2
                                                    size={20}
                                                />
                                            ) : (
                                                <div className="goal-task-circle" />
                                            )}

                                        </div>

                                        <div className="goal-task-content">

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

                                            <span className="goal-task-skill">
                                                Skill:{" "}
                                                {task.skill}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="goal-task-actions">

                                        <span
                                            className={`goal-task-status goal-task-status-${task.status}`}
                                        >
                                            {task.status}
                                        </span>

                                        {task.status !==
                                            "in-progress" && (
                                                <button
                                                    onClick={() =>
                                                        updateTaskStatus(
                                                            task._id,
                                                            "in-progress"
                                                        )
                                                    }
                                                    className="task-progress-btn"
                                                >
                                                    In Progress
                                                </button>
                                            )}

                                        {task.status !==
                                            "completed" && (
                                                <button
                                                    onClick={() =>
                                                        updateTaskStatus(
                                                            task._id,
                                                            "completed"
                                                        )
                                                    }
                                                    className="task-complete-btn"
                                                >
                                                    <CheckCircle2
                                                        size={14}
                                                    />
                                                    Complete
                                                </button>
                                            )}

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}

export default GoalDetails;