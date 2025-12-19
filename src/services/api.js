import axios from "axios";

const api = axios.create({
  baseUrl: import.meta.env.VITE_API_URL || "https://localhost:8000",
  withCredentials: true,
});

export default api;
