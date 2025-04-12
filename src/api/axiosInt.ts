import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_GET_QUIZ_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
