# HireSense

> **AI-Powered Career Development Platform**

HireSense is a full-stack AI career development platform that helps users understand their resume, evaluate ATS compatibility, identify skill gaps, set career goals, and build a personalized learning roadmap.

Instead of stopping at resume analysis, HireSense creates a continuous career-improvement loop:

**Upload Resume → Analyze → Identify Skill Gaps → Set Goals → Learn → Track Progress → Improve**

---

## 📖 Overview

Traditional resume analyzers mainly provide an ATS score and suggestions. HireSense goes further by connecting resume analysis with personalized career development.

Users can:

- Upload and analyze PDF resumes
- Receive an AI-generated ATS score
- Understand their resume strengths and weaknesses
- Identify missing skills
- Track resume analysis history
- Create career goals
- Track goal progress
- Create and manage learning tasks
- Generate AI-powered career roadmaps
- Add roadmap tasks directly to their learning tasks
- Track progress toward their target role

The platform combines AI, REST APIs, authentication, database management, file processing, and a responsive React frontend into one complete application.

---

## ✨ Key Features

### 📄 AI Resume Analysis

- PDF resume upload
- Resume text extraction
- Gemini-powered resume analysis
- ATS compatibility score
- Resume summary
- Strengths
- Missing skills
- Improvement suggestions

### 📊 Resume History

- Store previous resume analyses
- View previous ATS scores
- Compare resume performance over time
- Open detailed analysis for each resume

### 🎯 Career Goals

Users can create career goals by defining:

- Goal title
- Target role
- Target skills

Each goal tracks:

- Progress percentage
- Active / completed status
- Skill gaps
- Learning tasks
- Career roadmap

### 🤖 AI Career Roadmap

HireSense generates a personalized roadmap based on:

- Target role
- Target skills
- Current resume skills
- Identified skill gaps

The roadmap is organized into learning phases containing skills and practical tasks.

Users can add roadmap tasks directly to their task list.

### ✅ Learning Tasks

Users can:

- Create tasks
- Track task status
- Mark tasks as completed
- Delete tasks
- Connect tasks to career goals

Completing tasks automatically contributes to goal progress.

### 🔐 Authentication

- User registration
- User login
- JWT authentication
- Protected API routes
- Password hashing using bcrypt

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API |
| Authentication | JWT, bcryptjs |
| File Upload | Multer |
| PDF Processing | pdf-parse |
| HTTP Client | Axios |
| Icons | Lucide React |
| Version Control | Git & GitHub |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │     Vercel       │
                    └────────┬─────────┘
                             │
                         REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │     Render       │
                    └───────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ MongoDB  │  │  Gemini  │  │   JWT    │
        │  Atlas   │  │   API    │  │  Auth    │
        └──────────┘  └──────────┘  └──────────┘
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Dashboard
 │
 ├── Upload Resume
 │       │
 │       ▼
 │   PDF Extraction
 │       │
 │       ▼
 │   Gemini Analysis
 │       │
 │       ▼
 │   ATS + Skills + Suggestions
 │
 └── Career Goals
         │
         ▼
    Identify Skill Gaps
         │
         ▼
    Generate AI Roadmap
         │
         ▼
    Create Learning Tasks
         │
         ▼
    Complete Tasks
         │
         ▼
    Goal Progress Updates
```

---

## 📂 Project Structure

```text
HireSense/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── Screenshots/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account
- Google Gemini API key

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/dw-shreya/HireSense.git
cd HireSense
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files or API keys to GitHub.

---

## ▶️ Running Locally

### Start Backend

```bash
cd backend
node server.js
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔌 API Overview

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
```

### Resume

```text
POST /api/analyze-resume
GET  /api/resumes
GET  /api/resumes/:id
```

### Goals

```text
POST   /api/goals
GET    /api/goals
PATCH  /api/goals/:id
DELETE /api/goals/:id
GET    /api/goals/:id/skill-gaps
POST   /api/goals/:id/generate-roadmap
```

### Tasks

```text
POST   /api/tasks/:goalId
GET    /api/tasks/:goalId
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id
```

All protected endpoints require JWT authentication.

---

## 🤖 AI Integration

Google Gemini is used for intelligent career analysis.

### Resume Analysis

The backend sends extracted resume text to Gemini to generate structured information such as:

- ATS score
- Summary
- Skills
- Missing skills
- Strengths
- Improvements

### Career Roadmap

Gemini generates a structured roadmap using:

```text
Target Role
     +
Target Skills
     +
Current Resume Skills
     +
Skill Gaps
     ↓
Personalized Learning Roadmap
```

The generated roadmap is stored with the corresponding career goal.

---

## 🔐 Security

HireSense implements several backend security mechanisms:

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific database queries
- Environment variables for secrets
- CORS configuration
- Helmet security middleware

---

## 📸 Screenshots

### Landing Page

![Landing Page](Screenshots/landing.png)

---

### Dashboard

_Add dashboard screenshot here._

---

### Resume Analysis

![Resume Analysis](Screenshots/results.png)

---

### Career Goals

_Add Career Goals screenshot here._

---

### AI Career Roadmap

_Add AI Roadmap screenshot here._

---

## 🌐 Deployment

HireSense V2 uses:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
AI       → Google Gemini API
```

The V2 backend is deployed separately from the original V1 deployment.

---

## 🔮 Future Scope

Potential future improvements include:

- Job Description matching
- Resume-to-job compatibility analysis
- Resume version comparison
- Downloadable resume reports
- AI interview preparation
- Personalized job recommendations
- Multi-language resume analysis
- Advanced career analytics

---

## 👩‍💻 Author

**Shreya Dwivedi**

- GitHub: https://github.com/dw-shreya
- LinkedIn: https://www.linkedin.com/in/dw-shreya

---

## 📄 License

This project is licensed under the MIT License.
