import axios from "axios";

// Replace with your actual API Gateway URL
const BASE_URL = "https://your-api-gateway-url.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function subscribeToDailyReminder(email: string): Promise<void> {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  try {
    const response = await api.post("/subscribe", { email });

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to subscribe");
    }
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Subscription request failed";
    throw new Error(message);
  }
}
