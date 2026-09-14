const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    analyzeResume,
    getResumeHistory,
    getResumeById,
    compareResumes,
    deleteResume,
} = require("../controllers/resumeController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed."));
        }

        cb(null, true);
    },
});

router.post(
    "/analyze",
    protect,
    upload.single("resume"),
    analyzeResume
);

router.get(
    "/history",
    protect,
    getResumeHistory
);

router.get("/compare", protect, compareResumes);

router.get(
    "/:id",
    protect,
    getResumeById
);

router.delete(
    "/:id",
    protect,
    deleteResume
);

module.exports = router;