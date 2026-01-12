import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      onLoginSuccess && onLoginSuccess(res.data);
      navigate("/notes");
    } catch (err) {   
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-purple-700 via-pink-600 to-red-500 p-4">
      <div className="flex items-center mb-6">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-2 py-3 cursor-pointer bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            Don’t have an account? Create new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
