import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function Notes({ user }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes"); // backend me /notes route
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl mb-4">Welcome, {user.username}!</h1>
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
