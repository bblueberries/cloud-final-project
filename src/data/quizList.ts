import { sampleQuiz } from "./sampleQuiz";
import { QuestionSet, Question } from "../types/quiz";

export const quizList: QuestionSet[] = [
  {
    id: 1,
    title: "Quiz 1: General Knowledge",
    questions: sampleQuiz as Question[],
  },
  {
    id: 2,
    title: "Quiz 2: Science & Nature",
    questions: sampleQuiz as Question[],
  },
];
