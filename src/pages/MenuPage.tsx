import { useNavigate } from "react-router-dom";
import { sampleQuiz } from "../data/sampleQuiz";
import { useQuizStore } from "../store/quizStore";

export default function MenuPage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const handleStart = () => {
    startQuiz(sampleQuiz);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">
          Welcome to the Quiz App
        </h1>
        <p className="text-gray-600 text-lg">
          Test your knowledge and see how well you do!
        </p>
        <button
          onClick={handleStart}
          className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
