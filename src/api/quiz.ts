import api from "./axiosInt";
import { QuestionSet } from "../types/quiz";

export async function fetchQuizList(): Promise<
  { id: string; title: string }[]
> {
  const res = await api.get("/quizzes");
  return res.data;
}

//  Fetch a specific quiz by ID
export async function fetchQuizById(id: string): Promise<QuestionSet> {
  const res = await api.get(`/quizzes/${id}`);
  return res.data;
}
