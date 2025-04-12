import { type Question } from "../store/quizStore";

export const sampleQuiz: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    // choices: ["Berlin", "Paris", "Rome", "Madrid"],
    questionImage:
      "https://i.pinimg.com/originals/46/41/61/4641611401ecb508c625eebe448da663.gif",
    choiceImages: [
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    ],
    correctAnswerIndex: 1, // "Paris"
  },
  {
    questionImage:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    id: 2,
    question: "Which one is a fruit?",
    choices: ["Carrot", "Potato", "Apple", "Spinach"],
    correctAnswerIndex: 2, // "Apple"
  },
  {
    id: 3,
    question: "What color is the sky on a clear day?",
    choices: ["Green", "Blue", "Red", "Yellow"],
    correctAnswerIndex: 1, // "Blue"
  },
  {
    id: 4,
    question: "How many legs does a spider have?",
    choices: ["6", "8", "10", "12"],
    correctAnswerIndex: 1, // "8"
  },
  {
    id: 5,
    question: "What sound does a cow make?",
    choices: ["Meow", "Woof", "Moo", "Quack"],
    correctAnswerIndex: 2, // "Moo"
  },
  {
    id: 6,
    question: "Which is heavier, a ton of feathers or a ton of bricks?",
    choices: ["Feathers", "Bricks", "Both weigh the same", "Neither"],
    correctAnswerIndex: 2,
  },
  {
    id: 7,
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    correctAnswerIndex: 1,
  },
  {
    id: 8,
    question: "Which animal is known as man's best friend?",
    choices: ["Cat", "Dog", "Fish", "Bird"],
    correctAnswerIndex: 1,
  },
  {
    id: 9,
    question: "What do you call water in its solid state?",
    choices: ["Steam", "Ice", "Liquid", "Gas"],
    correctAnswerIndex: 1,
  },
  {
    id: 10,
    question: "What is the opposite of hot?",
    choices: ["Warm", "Cold", "Cool", "Freezing"],
    correctAnswerIndex: 1,
  },
];
