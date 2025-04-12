import { create } from "zustand";
import { Question } from "../types/quiz";

type QuizState = {
  questions: Question[];
  currentIndex: number;
  selectedAnswerIndices: number[];
  quizTitle: string | null;
  score: number;
  startQuiz: (questions: Question[], title: string) => void;
  selectAnswer: (index: number) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswerIndices: [],
  score: 0,
  quizTitle: null,

  //  UPDATED startQuiz to accept title
  startQuiz: (questions, title) =>
    set({
      questions,
      quizTitle: title,
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
      currentIndex: 0,
      selectedAnswerIndices: [],
      score: 0,
    }),
}));
