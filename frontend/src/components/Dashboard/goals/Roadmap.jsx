import { useState } from "react";
import API from "../../../services/api";

function Roadmap({ roadmap, goalId, onTaskAdded }) {
    const [addedTasks, setAddedTasks] = useState([]);

    const addTask = async (title, skill) => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.post(
                `/tasks/${goalId}`,
                {
                    title,
                    description: `Practice task for ${skill}`,
                    skill,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Add task to the list of added roadmap tasks
            setAddedTasks((prev) => [
                ...prev,
                title,
            ]);

            // Update Learning Tasks in parent component
            onTaskAdded(response.data.task);

        } catch (error) {
            console.error(
                "Add Roadmap Task Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to add task."
            );
        }
    };

    if (!roadmap || roadmap.length === 0) {
        return (
            <div className="roadmap-card">
                <p>No roadmap available.</p>
            </div>
        );
    }

    return (
        <div className="roadmap-card">
            <h2>AI Career Roadmap</h2>

            {roadmap.map((phase) => (
                <div
                    key={phase.phase}
                    className="roadmap-phase"
                >
                    <h3>
                        Phase {phase.phase}: {phase.title}
                    </h3>

                    <p>{phase.description}</p>

                    {phase.skills?.map((skill) => (
                        <div
                            key={skill.name}
                            className="roadmap-skill"
                        >
                            <h4>{skill.name}</h4>

                            <ul>
                                {skill.tasks?.map(
                                    (task, index) => {
                                        const isAdded =
                                            addedTasks.includes(task);

                                        return (
                                            <li key={index}>
                                                <span>
                                                    {task}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        addTask(
                                                            task,
                                                            skill.name
                                                        )
                                                    }
                                                    disabled={isAdded}
                                                >
                                                    {isAdded
                                                        ? "✓ Added to My Tasks"
                                                        : "Add to My Tasks"}
                                                </button>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Roadmap;