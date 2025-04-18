import api from "./axiosLambda";

export async function submitScore(score: number, topic: string): Promise<void> {
    try {
      const res = await api.post("/score", { score, topic });
  
      if (res.status !== 200) {
        throw new Error(res.data?.message || "Failed to submit score");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Unknown error";
      throw new Error("Submit score failed: " + msg);
    }
  }