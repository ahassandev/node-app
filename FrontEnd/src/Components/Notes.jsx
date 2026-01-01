// src/Components/Notes.jsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function Notes({ user, onLogout }) {
  const [notes, setNotes] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome, {user.username}!</h1>

        <button
          onClick={onLogout}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-blue-400">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
