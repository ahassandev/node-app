import React, { useState } from "react";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import Notes from "./Components/Notes.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // default page now is login
  const [user, setUser] = useState(null);

  const handleSignupSuccess = () => setCurrentPage("login");

  const handleLoginSuccess = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
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
