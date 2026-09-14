const Goal = require("../models/Goal");
const Resume = require("../models/Resume");
const { getGoalSkillGaps: calculateGoalSkillGaps } = require("../services/skillGapService");
const Task = require("../models/Task");
const { generateRoadmap } = require("../services/roadmapService");

const createGoal = async (req, res) => {
    try {
        const { title, targetRole, targetSkills } = req.body || {};

        if (!title || !targetRole) {
            return res.status(400).json({
                message: "Title and target role are required.",
            });
        }

        const goal = await Goal.create({
            user: req.user.id,
            title: title.trim(),
            targetRole: targetRole.trim(),
            targetSkills: targetSkills || [],
        });

        res.status(201).json({
            message: "Goal created successfully.",
            goal,
        });

    } catch (error) {
        console.error("Create Goal Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            goals,
        });

    } catch (error) {
        console.error("Get Goals Error:", error);

        res.status(500).json({
            message: "Failed to fetch goals.",
        });
    }
};

const getGoalSkillGaps = async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        const latestResume = await Resume.findOne({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        if (!latestResume) {
            return res.status(404).json({
                message: "No resume found. Please analyze a resume first.",
            });
        }

        const missingSkills = latestResume.missingSkills.map((skill) =>
            skill.trim().toLowerCase()
        );

        const skillGaps = goal.targetSkills.filter((skill) =>
            missingSkills.includes(skill.trim().toLowerCase())
        );

        res.status(200).json({
            goal: {
                id: goal._id,
                title: goal.title,
                targetRole: goal.targetRole,
            },
            skillGaps,
        });

    } catch (error) {
        console.error("Get Goal Skill Gaps Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const updateGoalProgress = async (req, res) => {
    try {
        const { progress } = req.body || {};

        if (progress === undefined) {
            return res.status(400).json({
                message: "Progress is required.",
            });
        }

        if (progress < 0 || progress > 100) {
            return res.status(400).json({
                message: "Progress must be between 0 and 100.",
            });
        }

        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        goal.progress = progress;

        if (progress === 100) {
            goal.status = "completed";
        } else {
            goal.status = "active";
        }

        await goal.save();

        res.status(200).json({
            message: "Goal progress updated successfully.",
            goal,
        });

    } catch (error) {
        console.error("Update Goal Progress Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const updateGoal = async (req, res) => {
    try {
        const { title, targetRole, targetSkills } = req.body || {};

        if (!title && !targetRole && !targetSkills) {
            return res.status(400).json({
                message: "At least one field is required.",
            });
        }

        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        if (title) {
            goal.title = title.trim();
        }

        if (targetRole) {
            goal.targetRole = targetRole.trim();
        }

        if (targetSkills) {
            goal.targetSkills = targetSkills;
        }

        await goal.save();

        res.status(200).json({
            message: "Goal updated successfully.",
            goal,
        });

    } catch (error) {
        console.error("Update Goal Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        res.status(200).json({
            message: "Goal deleted successfully.",
        });

    } catch (error) {
        console.error("Delete Goal Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const getGoalRoadmapInput = async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        const latestResume = await Resume.findOne({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        if (!latestResume) {
            return res.status(404).json({
                message: "No resume found. Please analyze a resume first.",
            });
        }

        const skillGaps = calculateGoalSkillGaps(
            goal,
            latestResume.skills
        );

        res.status(200).json({
            goal: {
                id: goal._id,
                targetRole: goal.targetRole,
                targetSkills: goal.targetSkills,
            },
            resumeSkills: latestResume.skills,
            skillGaps,
        });

    } catch (error) {
        console.error("Goal Roadmap Input Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const generateGoalRoadmap = async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found.",
            });
        }

        const latestResume = await Resume.findOne({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        if (!latestResume) {
            return res.status(404).json({
                message: "No resume found. Please analyze a resume first.",
            });
        }

        const resumeSkills = latestResume.skills || [];

        const skillGaps = goal.targetSkills.filter(
            (targetSkill) =>
                !resumeSkills.some(
                    (resumeSkill) =>
                        resumeSkill.toLowerCase() ===
                        targetSkill.toLowerCase()
                )
        );

        const roadmap = await generateRoadmap({
            targetRole: goal.targetRole,
            targetSkills: goal.targetSkills,
            resumeSkills,
            skillGaps,
        });

        goal.roadmap = roadmap;
        await goal.save();

        res.status(200).json({
            message: "Roadmap generated successfully.",
            roadmap,
        });

    } catch (error) {
        console.error("Generate Goal Roadmap Error:", error);

        res.status(500).json({
            message: "Failed to generate roadmap.",
        });
    }
};


module.exports = {
    createGoal,
    getGoals,
    getGoalSkillGaps,
    updateGoalProgress,
    updateGoal,
    deleteGoal,
    getGoalRoadmapInput,
    generateGoalRoadmap,
};