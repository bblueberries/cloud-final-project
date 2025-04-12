import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import { Question } from "../types/quiz";
import { quizList } from "../data/quizList";

export default function MenuPage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const handleStart = (questions: Question[], title: string) => {
    startQuiz(questions, title);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">Select a Quiz</h1>
        <p className="text-gray-600 text-lg">Test your knowledge!</p>

        <div className="space-y-4">
          {quizList.map((q) => (
            <button
              key={q.id}
              onClick={() => handleStart(q.questions, q.title)}
              className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
