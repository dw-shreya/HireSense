const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const mongoose = require("mongoose");
const { generateAIContent } = require("../services/aiService");

const isValidAnalysis = (analysis) => {
    return (
        typeof analysis.atsScore === "number" &&
        typeof analysis.summary === "string" &&
        Array.isArray(analysis.skills) &&
        Array.isArray(analysis.missingSkills) &&
        Array.isArray(analysis.strengths) &&
        Array.isArray(analysis.improvements)
    );
};

const analyzeResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume PDF.",
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);

        const pdfSignature = dataBuffer.toString("utf8", 0, 5);

        if (pdfSignature !== "%PDF-") {
            return res.status(400).json({
                message: "Invalid PDF file.",
            });
        }

        const data = await pdfParse(dataBuffer);

        const resumeText = data.text.toLowerCase();

        const resumeKeywords = [
            "education",
            "experience",
            "skills",
            "projects",
            "work",
            "internship",
            "certifications",
            "summary",
            "objective",
        ];

        const matchedKeywords = resumeKeywords.filter((keyword) =>
            resumeText.includes(keyword)
        );

        if (matchedKeywords.length < 2) {
            return res.status(400).json({
                message: "This document does not appear to be a resume. Please upload a professional resume.",
            });
        }

        const prompt = `
You are an experienced ATS resume reviewer.

Analyze the following resume.

Return ONLY a valid JSON object.

Do NOT include markdown.
Do NOT use \`\`\`json.
Do NOT write explanations before or after the JSON.

The JSON format must be:

{
  "atsScore": number,
  "summary": "string",
  "skills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "strengths": [
    "strength1",
    "strength2"
  ],
  "improvements": [
    "improvement1",
    "improvement2"
  ]
}

Resume:

${data.text}
`;

        const responseText = await generateAIContent(prompt);

        let analysis;

        try {
            analysis = JSON.parse(responseText);
        } catch (error) {
            return res.status(502).json({
                message: "The AI returned an invalid response. Please try again.",
            });
        }

        if (!isValidAnalysis(analysis)) {
            return res.status(502).json({
                message: "The AI returned an unexpected response. Please try again.",
            });
        }
        const resume = new Resume({
            user: req.user.id,

            fileName: req.file.originalname,

            atsScore: analysis.atsScore,

            summary: analysis.summary,

            skills: analysis.skills,

            missingSkills: analysis.missingSkills,

            strengths: analysis.strengths,

            improvements: analysis.improvements,
        });

        await resume.save();

        res.json(analysis);

    } catch (error) {
        console.error("Error analyzing resume:", error);

        if (error.status === 503) {
            return res.status(503).json({
                message: "The AI service is temporarily unavailable. Please try again shortly.",
            });
        }

        if (error.status === 429) {
            return res.status(429).json({
                message: "Too many AI requests. Please try again later.",
            });
        }

        return res.status(500).json({
            message: "Something went wrong while analyzing the resume.",
        });
    } finally {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

const getResumeHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const skip = (page - 1) * limit;

        const resumes = await Resume.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalResumes = await Resume.countDocuments({
            user: req.user.id,
        });

        res.status(200).json({
            resumes,
            page,
            limit,
            totalResumes,
            totalPages: Math.ceil(totalResumes / limit),
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch resume history.",
        });
    }
};

const getResumeById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid resume ID.",
            });
        }

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found.",
            });
        }

        res.status(200).json({
            resume,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const compareResumes = async (req, res) => {
    try {
        const { previousId, latestId } = req.query;

        if (!previousId || !latestId) {
            return res.status(400).json({
                message: "Both previous and latest resume IDs are required.",
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(previousId) ||
            !mongoose.Types.ObjectId.isValid(latestId)
        ) {
            return res.status(400).json({
                message: "Invalid resume ID.",
            });
        }

        const resumes = await Resume.find({
            _id: { $in: [previousId, latestId] },
            user: req.user.id,
        });

        const previousResume = resumes.find(
            (resume) => resume._id.toString() === previousId
        );

        const latestResume = resumes.find(
            (resume) => resume._id.toString() === latestId
        );

        if (!previousResume || !latestResume) {
            return res.status(404).json({
                message: "One or both resumes were not found.",
            });
        }

        const previousSkills = previousResume.skills || [];
        const latestSkills = latestResume.skills || [];

        const newSkills = latestSkills.filter(
            (skill) =>
                !previousSkills.some(
                    (previousSkill) =>
                        previousSkill.toLowerCase() ===
                        skill.toLowerCase()
                )
        );

        const removedSkills = previousSkills.filter(
            (skill) =>
                !latestSkills.some(
                    (latestSkill) =>
                        latestSkill.toLowerCase() ===
                        skill.toLowerCase()
                )
        );

        const atsImprovement =
            latestResume.atsScore - previousResume.atsScore;

        res.status(200).json({
            comparison: {
                previous: {
                    id: previousResume._id,
                    fileName: previousResume.fileName,
                    atsScore: previousResume.atsScore,
                    skills: previousResume.skills,
                    missingSkills: previousResume.missingSkills,
                },

                latest: {
                    id: latestResume._id,
                    fileName: latestResume.fileName,
                    atsScore: latestResume.atsScore,
                    skills: latestResume.skills,
                    missingSkills: latestResume.missingSkills,
                },

                changes: {
                    atsImprovement,
                    newSkills,
                    removedSkills,
                    missingSkillsReduced:
                        previousResume.missingSkills.length -
                        latestResume.missingSkills.length,
                },
            },
        });

    } catch (error) {
        console.error("Compare Resumes Error:", error);

        res.status(500).json({
            message: "Failed to compare resumes.",
        });
    }
};

const deleteResume = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid resume ID.",
            });
        }

        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found.",
            });
        }

        res.status(200).json({
            message: "Resume deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Something went wrong.",
        });

    }
};

module.exports = {
    isValidAnalysis,
    analyzeResume,
    getResumeHistory,
    getResumeById,
    compareResumes,
    deleteResume,
};
