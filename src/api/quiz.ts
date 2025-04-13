import api from "./axiosInt";
import { QuestionSet } from "../types/quiz";

export async function fetchQuizList(): Promise<
  { id: string; title: string }[]
> {
  const res = await api.get("/list-quizzes");

  const quizIds: string[] = res.data.quiz_ids;

  if (!Array.isArray(quizIds)) {
    //incase of null or undefined
    throw new Error("Invalid quiz list format from API");
  }

  return quizIds.map((id) => ({
    id,
    title: id,
  }));
}

export async function fetchQuizById(id: string): Promise<QuestionSet> {
  const res = await api.get("get-quiz", {
    params: { quiz_id: id },
  });

  if (!res.data || !res.data.id || !res.data.questions) {
    throw new Error("Invalid quiz data returned from API");
  }

  return res.data as QuestionSet;
}
