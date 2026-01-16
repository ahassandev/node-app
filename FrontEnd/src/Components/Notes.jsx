import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Notes({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch user notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  // 🔹 Logout handler
  const handleLogoutClick = async () => {
    try {
      await onLogout();
      navigate("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Navigate to Create Blog page
  const handleCreateBlog = () => {
    navigate("/create-blog");
  };

  // 🔹 Navigate to Blog Index page
  const handleGoToBlogs = () => {
    navigate("/blog/index");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome, {user.username}!</h1>

        <div className="flex gap-3">
          {/* Create Blog Button */}
          <button
            onClick={handleCreateBlog}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            Create Blog
          </button>

          {/* Go to Blogs Button */}
          <button
            onClick={handleGoToBlogs}
            className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg cursor-pointer"
          >
            Go to Blogs
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes created yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-blue-400 text-lg font-semibold">
                {note.title}
              </h2>
              <p className="text-gray-300 mt-2">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;
