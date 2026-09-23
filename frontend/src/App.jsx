import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeDetails from "./pages/ResumeDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import GoalDetails from "./pages/GoalDetails";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <ResumeHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/goals/:id"
                    element={<GoalDetails />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;