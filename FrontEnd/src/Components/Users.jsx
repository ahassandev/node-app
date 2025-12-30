import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);

      console.log("Users Loaded:", res.data); // check log
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 font-bold">All Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="bg-gray-900 text-white p-4 rounded-lg">
          {users.map((u) => (
            <div key={u._id} className="border-b border-gray-700 py-2">
              <p><b>Name:</b> {u.name}</p>
              <p><b>Username:</b> {u.username}</p>
              <p><b>Email:</b> {u.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
