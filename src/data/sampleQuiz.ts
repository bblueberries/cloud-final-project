import { type Question } from "../store/quizStore";

export const sampleQuiz: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    choices: ["Berlin", "Paris", "Rome", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which one is a fruit?",
    choices: ["Carrot", "Potato", "Apple", "Spinach"],
    correctAnswer: "Apple",
  },
  {
    id: 3,
    question: "What color is the sky on a clear day?",
    choices: ["Green", "Blue", "Red", "Yellow"],
    correctAnswer: "Blue",
  },
  {
    id: 4,
    question: "How many legs does a spider have?",
    choices: ["6", "8", "10", "12"],
    correctAnswer: "8",
  },
  {
    id: 5,
    question: "What sound does a cow make?",
    choices: ["Meow", "Woof", "Moo", "Quack"],
    correctAnswer: "Moo",
  },
  {
    id: 6,
    question: "Which is heavier, a ton of feathers or a ton of bricks?",
    choices: ["Feathers", "Bricks", "Both weigh the same", "Neither"],
    correctAnswer: "Both weigh the same",
  },
  {
    id: 7,
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    correctAnswer: "4",
  },
  {
    id: 8,
    question: "Which animal is known as man's best friend?",
    choices: ["Cat", "Dog", "Fish", "Bird"],
    correctAnswer: "Dog",
  },
  {
    id: 9,
    question: "What do you call water in its solid state?",
    choices: ["Steam", "Ice", "Liquid", "Gas"],
    correctAnswer: "Ice",
  },
  {
    id: 10,
    question: "What is the opposite of hot?",
    choices: ["Warm", "Cold", "Cool", "Freezing"],
    correctAnswer: "Cold",
  },
];
