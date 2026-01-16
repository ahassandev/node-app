import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function BlogIndex({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      setBlogs(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/blog/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">All Blogs</h1>

      {blogs.length === 0 && <p>No blogs found</p>}

      {blogs.map((blog) => (
        <div key={blog._id} className="bg-gray-800 p-4 mb-3 rounded shadow-md">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="my-2">{blog.description}</p>

          {/* ✅ Buttons show/hide for admin or blog owner */}
          {user && (user.role === "admin" || blog.user?._id === user._id) && (
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => navigate(`/blog/edit/${blog._id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg transition duration-200 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogIndex;
