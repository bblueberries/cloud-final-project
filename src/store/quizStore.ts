import { create } from "zustand";

export type Question = {
  id: number;
  question: string;
  questionImage?: string;
  choices: string[];
  choiceImages?: string[];
  correctAnswerIndex: number;
};

type QuizState = {
  questions: Question[];
  currentIndex: number;
  selectedAnswers: string[]; // store user's selected choice text
  score: number;
  startQuiz: (questions: Question[]) => void;
  selectAnswer: (answer: string, index: number) => void;
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

  selectAnswer: (answer, index) => {
    const { questions, currentIndex, selectedAnswers, score } = get();
    const currentQ = questions[currentIndex];
    const isCorrect = index === currentQ.correctAnswerIndex;

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
