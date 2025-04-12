import axios from "axios";
import { QuestionSet } from "../types/quiz";

//  Base API endpoint
const BASE_URL = "https://your-api-gateway-url.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Fetch list of available quizzes
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
