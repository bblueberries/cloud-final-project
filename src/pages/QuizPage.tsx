import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import { withClickSoundDelay } from "../utils/withClickSoundDelay";

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    questions,
    currentIndex,
    selectAnswer,
    quizTitle, //  pull title from state
  } = useQuizStore();

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    navigate(currentIndex >= questions.length ? "/result" : "/");
    return null;
  }

  const handleSelect = async (index: number) => {
    selectAnswer(index);

    if (currentIndex + 1 >= questions.length) {
      navigate("/result");
    }
  };

  const choiceCount =
    currentQuestion.choices?.length ||
    currentQuestion.choiceImages?.length ||
    0;

  const isImageGrid = !!currentQuestion.choiceImages;
  const gridClass = isImageGrid ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-sm text-gray-500 text-right">
          Question {currentIndex + 1} / {questions.length}
        </div>

        {/*  Quiz Title */}
        {quizTitle && (
          <h1 className="text-xl font-bold text-blue-600 text-center">
            {quizTitle}
          </h1>
        )}

        {/* Question Text */}
        <h2 className="text-2xl font-bold text-gray-800">
          {currentQuestion.question}
        </h2>

        {/* Optional Question Image */}
        {currentQuestion.questionImage && (
          <img
            src={currentQuestion.questionImage}
            alt="question visual"
            className="w-full h-auto rounded-lg shadow mb-4"
          />
        )}

        {/* Answer Choices */}
        <div className={`grid ${gridClass} gap-4`}>
          {Array.from({ length: choiceCount }).map((_, index) => {
            const text = currentQuestion.choices?.[index];
            const image = currentQuestion.choiceImages?.[index];

            return (
              <button
                key={index}
                onClick={withClickSoundDelay(() => handleSelect(index))}
                className="w-full bg-gray-200 hover:shadow-lg hover:scale-[1.02]  text-gray-800 rounded-xl transition font-medium overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center p-3 space-y-2">
                  {image && (
                    <img
                      src={image}
                      alt={`choice ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  {text && (
                    <span className="text-center font-semibold">{text}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
