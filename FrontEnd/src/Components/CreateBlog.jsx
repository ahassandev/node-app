import React, { useState, useEffect } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function CreateBlog({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // 🔹 Redirect non-logged-in users
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/blog/create", { title, description });
      navigate("/blog/index");
    } catch (err) {
      console.error("BLOG CREATE ERROR:", err.response?.data);
      alert("Blog create failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Create Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          rows="4"
          required
        />
        <button className="w-full bg-blue-600 p-2 rounded cursor-pointer">Save Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
