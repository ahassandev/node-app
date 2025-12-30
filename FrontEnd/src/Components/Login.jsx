// src/Components/Login.jsx
import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess, onBack, onSignupRedirect }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      if (onLoginSuccess) onLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 p-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-white text-2xl mr-4">
          ←
        </button>
        <h1 className="text-white text-2xl font-bold">Login</h1>
      </div>

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={form.identifier}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="mt-2 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={onSignupRedirect}
              className="text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Create new account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
