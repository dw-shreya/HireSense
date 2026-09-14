const Task = require("../models/Task");
const Goal = require("../models/Goal");

const createTask = async (req, res) => {
    try {
        const { title, description, skill } = req.body || {};
        const { goalId } = req.params;

        if (!title || !skill) {
            return res.status(400).json({
                message: "Title and skill are required.",
            });
        }

        const goal = await Goal.findOne({
            _id: goalId,
            user: req.user.id,
        });

        const existingTask = await Task.findOne({
            goal: goalId,
            user: req.user.id,
            title: title.trim(),
        });

        if (existingTask) {
            return res.status(409).json({
                message: "This task already exists.",
                task: existingTask,
            });
        }

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        const task = await Task.create({
            user: req.user.id,
            goal: goal._id,
            title: title.trim(),
            description: description?.trim(),
            skill: skill.trim(),
        });

        res.status(201).json({
            message: "Task created successfully.",
            task,
        });

    } catch (error) {
        console.error("Create Task Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const { goalId } = req.params;

        const goal = await Goal.findOne({
            _id: goalId,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        const tasks = await Task.find({
            goal: goalId,
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            tasks,
        });

    } catch (error) {
        console.error("Get Tasks Error:", error);

        res.status(500).json({
            message: "Failed to fetch tasks.",
        });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body || {};

        const allowedStatuses = [
            "pending",
            "in-progress",
            "completed",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid task status.",
            });
        }

        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
            });
        }

        task.status = status;

        await task.save();

        // Get all tasks belonging to this goal
        const totalTasks = await Task.countDocuments({
            goal: task.goal,
            user: req.user.id,
        });

        // Get completed tasks
        const completedTasks = await Task.countDocuments({
            goal: task.goal,
            user: req.user.id,
            status: "completed",
        });

        // Calculate goal progress
        const progress =
            totalTasks === 0
                ? 0
                : Math.round((completedTasks / totalTasks) * 100);

        // Update the goal
        const goal = await Goal.findOne({
            _id: task.goal,
            user: req.user.id,
        });

        if (goal) {
            goal.progress = progress;

            if (progress === 100) {
                goal.status = "completed";
            } else {
                goal.status = "active";
            }

            await goal.save();
        }

        res.status(200).json({
            message: "Task status updated successfully.",
            task,
            goalProgress: progress,
        });

    } catch (error) {
        console.error("Update Task Status Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, skill } = req.body || {};

        if (!title && !description && !skill) {
            return res.status(400).json({
                message: "At least one field is required.",
            });
        }

        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
            });
        }

        if (title) {
            task.title = title.trim();
        }

        if (description) {
            task.description = description.trim();
        }

        if (skill) {
            task.skill = skill.trim();
        }

        await task.save();

        res.status(200).json({
            message: "Task updated successfully.",
            task,
        });

    } catch (error) {
        console.error("Update Task Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.taskId,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
            });
        }

        res.status(200).json({
            message: "Task deleted successfully.",
        });

    } catch (error) {
        console.error("Delete Task Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus,
    updateTask,
    deleteTask,
};
