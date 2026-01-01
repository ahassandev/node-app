import React, { useState, useEffect } from "react";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Notes from "./Components/Notes.jsx";
import api from "./axiosConfig";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-check login
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me"); // server reads cookie
        setUser(res.data.user);
        setCurrentPage("notes");
      } catch (err) {
        setUser(null);
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

  const handleSignupSuccess = () => setCurrentPage("login");

  const handleLoginSuccess = (data) => {
    setUser(data.user);       // set user state
    setCurrentPage("notes");  // go to notes
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // delete cookie from server
      setUser(null);                  // reset frontend state
      setCurrentPage("login");        // show login page
    } catch (err) {
      console.error(err);
    }
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

      {currentPage === "notes" && <Notes user={user} onLogout={handleLogout} />}
    </>
  );
}

export default App;
