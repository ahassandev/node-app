import React, { useState, useEffect } from "react";
import axios from "axios";

function Users({ user }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u._id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-blue-400">{u.name}</h2>
            <p className="text-gray-300">Username: {u.username}</p>
            <p className="text-gray-300">Email: {u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
