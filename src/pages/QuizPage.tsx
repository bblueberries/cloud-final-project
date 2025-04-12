import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function QuizPage() {
  const navigate = useNavigate();
  const { questions, currentIndex, selectAnswer } = useQuizStore();

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    navigate(currentIndex >= questions.length ? "/result" : "/");
    return null;
  }

  const handleSelect = (choice: string) => {
    selectAnswer(choice);
    if (currentIndex + 1 >= questions.length) {
      navigate("/result");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-sm text-gray-500 text-right">
          Question {currentIndex + 1} / {questions.length}
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleSelect(choice)}
              className="py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition font-medium"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
