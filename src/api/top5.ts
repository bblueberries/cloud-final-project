import api from "./axiosLambda";

export async function fetchTop5Scores(topic: string) {
  try {
    const res = await api.get("/top5", {
      params: { topic },
    });

    return res.data.top5 || [];
  } catch (err: any) {
    const msg =
      err.response?.data?.message || err.message || "Unknown error";
    throw new Error("Failed to fetch top scores: " + msg);
  }
}
