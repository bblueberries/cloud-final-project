import { create } from "zustand";

export type Question = {
  id: number;
  question: string;
  image?: string;
  choices: string[];
  correctAnswer: string;
};

type QuizState = {
  questions: Question[];
  currentIndex: number;
  selectedAnswers: string[];
  score: number;
  startQuiz: (questions: Question[]) => void;
  selectAnswer: (answer: string) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswers: [],
  score: 0,

  startQuiz: (questions) =>
    set({
      questions,
      currentIndex: 0,
      selectedAnswers: [],
      score: 0,
    }),

  selectAnswer: (answer) => {
    const { questions, currentIndex, selectedAnswers, score } = get();
    const currentQ = questions[currentIndex];
    const isCorrect = answer === currentQ.correctAnswer;

    set({
      selectedAnswers: [...selectedAnswers, answer],
      currentIndex: currentIndex + 1,
      score: isCorrect ? score + 1 : score,
    });
  },

  resetQuiz: () =>
    set({
      questions: [],
      currentIndex: 0,
      selectedAnswers: [],
      score: 0,
    }),
}));
