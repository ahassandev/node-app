import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function EditBlog() {
  const { id } = useParams(); // blog ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch single blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        console.error("FETCH BLOG ERROR:", err.response?.data);
        alert("Cannot fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle blog update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blog/${id}`, { title, description });
      alert("Blog updated successfully");
      navigate("/blog/index"); // Go back to all blogs
    } catch (err) {
      console.error("UPDATE BLOG ERROR:", err.response?.data);
      alert("Blog update failed");
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Edit Blog</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg cursor-pointer text-white transition duration-200">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
