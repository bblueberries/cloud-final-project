import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function ResultPage() {
  const navigate = useNavigate();
  const { questions, selectedAnswerIndices, score, resetQuiz, quizTitle } =
    useQuizStore();

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Quiz Title */}
        {quizTitle && (
          <h1 className="text-xl font-bold text-blue-600 text-center">
            {quizTitle}
          </h1>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800">
          You scored {score} / {questions.length}
        </h2>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const correctIndex = q.correctAnswerIndex;
            const selectedIndex = selectedAnswerIndices[i];

            const correctText = q.choices?.[correctIndex];
            const correctImage = q.choiceImages?.[correctIndex];

            const userText = q.choices?.[selectedIndex];
            const userImage = q.choiceImages?.[selectedIndex];

            const isCorrect = selectedIndex === correctIndex;

            return (
              <div
                key={q.id}
                className={`p-4 border rounded-lg space-y-2 ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <p className="font-semibold text-gray-800">
                  Q{i + 1}: {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* User's Answer */}
                  <div>
                    <p className="text-sm text-gray-500">Your answer:</p>
                    <div className="flex flex-col items-start">
                      {userImage && (
                        <img
                          src={userImage}
                          alt="your answer"
                          className="w-32 h-24 object-cover rounded"
                        />
                      )}
                      {userText && (
                        <span
                          className={`font-semibold ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {userText}
                        </span>
                      )}
                      {!userText && !userImage && (
                        <span className="text-red-600 font-semibold">
                          No answer
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Correct Answer */}
                  {!isCorrect && (
                    <div>
                      <p className="text-sm text-gray-500">Correct answer:</p>
                      <div className="flex flex-col items-start">
                        {correctImage && (
                          <img
                            src={correctImage}
                            alt="correct answer"
                            className="w-32 h-24 object-cover rounded"
                          />
                        )}
                        {correctText && (
                          <span className="font-semibold text-green-600">
                            {correctText}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
