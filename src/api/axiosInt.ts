import axios from "axios";

const BASE_URL = "https://your-api-gateway-url.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
