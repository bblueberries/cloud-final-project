import api from "./axiosInt";
import { QuestionSet } from "../types/quiz";

export async function fetchQuizList(): Promise<
  { id: string; title: string }[]
> {
  const res = await api.get("/quizzes");
  const body = JSON.parse(res.data.body);
  return body.quizzes.map((q: QuestionSet) => ({
    id: q.id,
    title: q.title,
  }));
}

export async function fetchQuizById(id: string): Promise<QuestionSet> {
  const res = await api.get("", {
    params: { quiz_id: id },
  });

  if (!res.data || !res.data.id || !res.data.questions) {
    throw new Error("Invalid quiz data returned from API");
  }

  return res.data as QuestionSet;
}
