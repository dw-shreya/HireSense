const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        targetRole: {
            type: String,
            required: true,
            trim: true,
        },

        targetSkills: [
            {
                type: String,
                trim: true,
            },
        ],

        roadmap: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;