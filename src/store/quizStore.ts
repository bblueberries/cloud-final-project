import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "../types/quiz";

type QuizState = {
  questions: Question[];
  quizId: string | null;
  quizTitle: string | null;
  currentIndex: number;
  selectedAnswerIndices: number[];
  score: number;

  startQuiz: (questions: Question[], title: string, id: string) => void;
  selectAnswer: (index: number) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      questions: [],
      quizTitle: null,
      quizId: null,
      currentIndex: 0,
      selectedAnswerIndices: [],
      score: 0,

      startQuiz: (questions, title, id) =>
        set({
          questions,
          quizTitle: title,
          quizId: id,
          currentIndex: 0,
          selectedAnswerIndices: [],
          score: 0,
        }),

      selectAnswer: (selectedIndex) => {
        const { questions, currentIndex, selectedAnswerIndices, score } = get();
        const currentQ = questions[currentIndex];
        const isCorrect = selectedIndex === currentQ.correctAnswerIndex;

        const updatedSelections = [...selectedAnswerIndices];
        updatedSelections[currentIndex] = selectedIndex;

        set({
          selectedAnswerIndices: updatedSelections,
          currentIndex: currentIndex + 1,
          score: isCorrect ? score + 1 : score,
        });
      },

      resetQuiz: () =>
        set({
          questions: [],
          quizTitle: null,
          quizId: null,
          currentIndex: 0,
          selectedAnswerIndices: [],
          score: 0,
        }),
    }),
    {
      name: "meme-quiz-storage", // localStorage key
    }
  )
);
