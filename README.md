# HireSense

Live • AI Powered • Full Stack

An AI-powered Resume Analyzer that evaluates resumes, generates ATS compatibility scores, identifies missing skills, and provides personalized improvement suggestions using Google Gemini AI.

---

## 🌐 Live Demo

** Try HireSense:** hire-sense-v2.vercel.app

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take up to 60 seconds while the server wakes up.

##  Overview

Hiring processes today rely heavily on Applicant Tracking Systems (ATS), making it difficult for candidates to understand how well their resumes align with industry expectations.

HireSense simplifies this process by allowing users to upload their resume in PDF format and receive an AI-generated analysis within seconds. The application extracts resume content, evaluates ATS compatibility, summarizes the profile, identifies strengths and missing skills, and provides actionable recommendations to improve the resume.

Designed with a modern full-stack architecture, HireSense demonstrates the integration of AI, backend APIs, PDF processing, and responsive frontend development into a single production-ready application.

The application is deployed and publicly accessible, showcasing a complete full-stack AI workflow from resume upload to intelligent analysis.

## ✨ Features

-  Upload resumes in PDF format
-  AI-powered resume analysis using Google Gemini
-  ATS compatibility score generation
-  Resume summary generation
-  Identification of strengths and key skills
-  Detection of missing skills
-  Personalized improvement suggestions
-  Responsive and modern user interface
-  Input validation and error handling

##  Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| AI Model | Google Gemini 2.5 Flash |

## 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, CSS3 |
| Backend | Node.js, Express.js |
| AI | Google Gemini API |
| File Processing | Multer, pdf-parse |
| Language | JavaScript |
| Version Control | Git & GitHub |

##  Architecture

Resume (PDF)
      │
      ▼
React Frontend (Vercel)
      │
      ▼
Express Backend (Render)
      │
      ▼
Google Gemini AI
      │
      ▼
Resume Analysis

##  Project Structure

```text
HireSense/
├── backend/
│   ├── routes/              # API endpoints
│   ├── uploads/             # Temporary PDF uploads
│   ├── server.js            # Express server
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images and static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── Screenshots/
│   ├── Landing.png
│   ├── Loading.png
│   └── Results.png
│
└── README.md
```

##  Getting Started

### Prerequisites

- Node.js v18 or later
- Google Gemini API Key
- npm

- ### Environment Variables

Create a `.env` file inside the `backend` directory and add:

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### Installation

Clone the repository:

```bash
git clone https://github.com/dw-shreya/HireSense.git
cd HireSense
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Running the Project

Start the backend server:

```bash
cd backend
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

## 📸 Screenshots

### Landing Page

![Landing](Screenshots/landing.png)

---

### Resume Upload & AI Analysis

![Loading](Screenshots/loading.png)

---

### AI Analysis Results Dashboard

![Results](Screenshots/results.png)


##  Future Enhancements

- Job Description (JD) matching
- User authentication and profile management
- Resume analysis history
- Downloadable PDF reports
- Resume version comparison
- Multi-language resume support
- AI-powered interview preparation

- ##  Author

**Shreya Dwivedi**

- GitHub: https://github.com/dw-shreya
- LinkedIn: https://www.linkedin.com/in/dw-shreya/

- ## 📄 License

This project is licensed under the MIT License.
Feel free to fork this project, explore the code, and suggest improvements.
