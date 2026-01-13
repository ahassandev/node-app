import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Notes from "./Components/Notes.jsx";
import api from "./axiosConfig";

function LogoutPage({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, []);
  return <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleLoginSuccess = (data) => {
    setUser(data.user);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <Router>
      <Routes>
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
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/notes" />}
        />
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
        <Route
          path="/logout"
          element={<LogoutPage onLogout={handleLogout} />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/notes" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
