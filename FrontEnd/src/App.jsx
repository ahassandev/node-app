// src/App.jsx
import React, { useState, useEffect } from "react";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Notes from "./Components/Notes.jsx";
import api from "./axiosConfig"; // axios with credentials

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // default login page
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading state for token check

  // Auto-check if user is already logged in via cookie/token
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me"); // backend route to verify token
        setUser(res.data.user);
        setCurrentPage("notes");
      } catch (err) {
        setCurrentPage("login");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  // Signup -> Login redirect
  const handleSignupSuccess = () => setCurrentPage("login");

  // Login success -> Notes page
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage("notes");
  };

  return (
    <>
      {currentPage === "signup" && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onGoToLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSignupRedirect={() => setCurrentPage("signup")}
        />
      )}

      {currentPage === "notes" && <Notes user={user} />}
    </>
  );
}

export default App;
