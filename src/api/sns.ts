import api from "./axiosLambda";

export async function subscribeToDailyReminder(email: string): Promise<void> {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  try {
    const response = await api.post("/register", { email });

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
