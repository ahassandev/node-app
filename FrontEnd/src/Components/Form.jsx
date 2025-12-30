import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(formData); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 cursor-pointer rounded w-full hover:bg-blue-700"
      >
        Create Account
      </button>
    </form>
  );
}

export default Form;
