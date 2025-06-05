import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/AuthContext";
import BuyCourse from "./pages/BuyCourse";
import Course from "./pages/Course";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/buy-course/:courseId"
            element={
              <ProtectedRoute>
                <BuyCourse />
              </ProtectedRoute>
            }
          />
          <Route path="course/:courseId" element={<Course />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
