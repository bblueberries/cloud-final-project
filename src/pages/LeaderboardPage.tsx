import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import { withClickSoundDelay } from "../utils/withClickSoundDelay";
import { useParams } from "react-router-dom";
import axiosLambda from "../api/axiosLambda";

type ScoreEntry = {
  username: string;
  score: number;
  topic: string;
  updatedAt: string;
};

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { topic } = useParams(); // <-- get topic from URL
  const encodedTopic = topic || "unknown";
  const { resetQuiz } = useQuizStore();

  const [top5, setTop5] = useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTop5 = async () => {
      try {
        // const topic = quizTitle?.replace(/\s+/g, "-") || "unknown";
        // const encodedTopic = topic || "unknown";
        const res = await axiosLambda.get(`/top5`, {
            params: { topic: encodedTopic },
        });
        setTop5(res.data.top5 || []);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTop5();
  }, [topic]);

  const handleRestart = () => {
    resetQuiz();
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          {/* {quizTitle} Leaderboard */}
          {encodedTopic.replace(/-/g, " ")} Leaderboard
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            {top5.map((entry, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <div className="font-semibold text-gray-700">
                  #{index + 1}. {entry.username}
                </div>
                <div className="text-blue-600 font-bold text-lg">
                  {entry.score}
                </div>
              </div>
            ))}
            {top5.length === 0 && (
              <p className="text-center text-gray-500">No scores yet.</p>
            )}
          </div>
        )}

        <div className="pt-6 flex justify-center">
          <button
            onClick={withClickSoundDelay(handleRestart)}
            className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
