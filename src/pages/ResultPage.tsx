import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function ResultPage() {
  const navigate = useNavigate();
  const { questions, selectedAnswers, score, resetQuiz } = useQuizStore();

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-700">
          Quiz Results
        </h1>
        <p className="text-lg text-center text-gray-700">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const correctAnswer = q.choices[q.correctAnswerIndex];
            const userAnswer = selectedAnswers[i];
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-4 border rounded-lg ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <p className="font-semibold mb-1 text-gray-800">
                  Q{i + 1}: {q.question}
                </p>
                <p>
                  Your answer:{" "}
                  <span
                    className={`font-semibold ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userAnswer || "No answer"}
                  </span>
                </p>
                {!isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <span className="font-semibold text-green-600">
                      {correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-6 flex justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
