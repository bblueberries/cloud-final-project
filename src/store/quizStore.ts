import { create } from "zustand";

export type Question = {
  id: number;
  question: string;
  questionImage?: string;
  choices?: string[];
  choiceImages?: string[];
  correctAnswerIndex: number;
};

type QuizState = {
  questions: Question[];
  currentIndex: number;
  selectedAnswerIndices: number[];
  score: number;
  startQuiz: (questions: Question[]) => void;
  selectAnswer: (index: number) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswerIndices: [],
  score: 0,

  startQuiz: (questions) =>
    set({
      questions,
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
      currentIndex: 0,
      selectedAnswerIndices: [],
      score: 0,
    }),
}));
