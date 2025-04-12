export type Question = {
  id: number;
  question: string;
  questionImage?: string;
  choices?: string[];
  choiceImages?: string[];
  correctAnswerIndex: number;
};

export type QuestionSet = {
  id: number;
  title: string;
  questions: Question[];
};
