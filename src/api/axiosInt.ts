import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_GET_QUIZ_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        console.log("found Cognito token");
      } else {
        console.warn("No token in session:", session);
      }
    } catch (err) {
      console.warn("Error fetching token:", err);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
