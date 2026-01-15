import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Notes from "./Components/Notes.jsx";
import CreateBlog from "./Components/CreateBlog.jsx";
import BlogIndex from "./Components/BlogIndex.jsx";
import EditBlog from "./Components/EditBlog.jsx";
import api from "./axiosConfig";

// Logout Page
function LogoutPage({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Check login on refresh
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Login success
  const handleLoginSuccess = (data) => {
    setUser(data.user);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !user ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/notes" />
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/notes" />}
        />

        {/* NOTES (HOME AFTER LOGIN) */}
        <Route
          path="/notes"
          element={
            user ? (
              <Notes user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* CREATE BLOG */}
        <Route
          path="/create-blog"
          element={user ? <CreateBlog /> : <Navigate to="/login" />}
        />

        {/* BLOG LIST */}
        <Route
          path="/blog/index"
          element={user ? <BlogIndex user={user} /> : <Navigate to="/login" />}
        />

        {/* EDIT BLOG */}
        <Route
          path="/blog/edit/:id"
          element={user ? <EditBlog /> : <Navigate to="/login" />}
        />

        {/* LOGOUT */}
        <Route
          path="/logout"
          element={<LogoutPage onLogout={handleLogout} />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={user ? "/notes" : "/login"} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
