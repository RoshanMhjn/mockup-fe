import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const token = localStorage.getItem("authToken");
if (token) {
  api.defaults.headers.common.Authorization = `Token ${token}`;
}

export default api;
