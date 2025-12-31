import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // cookies ke liye zaruri
});

export default api;
