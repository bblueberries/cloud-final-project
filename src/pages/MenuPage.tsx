import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import { subscribeToDailyReminder } from "../api/sns";
import { fetchQuizById, fetchQuizList } from "../api/quiz";
import PacmanLoader from "react-spinners/PacmanLoader";
import toast from "react-hot-toast";
import { withClickSoundDelay } from "../utils/withClickSoundDelay";
import { signOut } from "aws-amplify/auth";

export default function MenuPage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<{ id: string; title: string }[]>([]);

  // useEffect(() => {
  // const logToken = async () => {
  //   const session = await fetchAuthSession();
  //   console.log("Access Token:", session.tokens?.accessToken?.toString());
  // };

  // logToken();
  // }, []);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuizList();
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to load quiz list:", err);
        toast.error("Failed to load quiz list.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleStart = async (quizId: string) => {
    try {
      setIsLoading(true);
      const quiz = await fetchQuizById(quizId);
      startQuiz(quiz.questions, quiz.title);
      navigate("/quiz");
    } catch (err: any) {
      toast.error("Failed to load quiz: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await subscribeToDailyReminder(email);
      toast.success("Subscribed! Check your inbox to confirm.");
      setEmail("");
    } catch (err: any) {
      toast.error("Subscription failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err: any) {
      toast.error("Logout failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6 relative">
      {/*  Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 text-sm bg-red-100 text-red-600 border border-red-300 rounded hover:bg-red-200 transition z-50"
      >
        Logout
      </button>

      {/* Overlay spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <PacmanLoader color="#3B82F6" size={25} />
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center space-y-8 z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-600">Meme Quiz</h1>
          <p className="text-gray-600 text-lg">
            Pick a quiz or subscribe for daily meme madness!
          </p>
        </div>

        <div className="space-y-4">
          {quizzes.map((q) => (
            <button
              key={q.id}
              onClick={withClickSoundDelay(() => handleStart(q.id))}
              className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              {q.title}
            </button>
          ))}
        </div>

        <hr className="border-gray-300" />

        <div className="space-y-3">
          <p className="text-gray-700 font-medium text-sm">
            Didn’t get the email? Re-subscribe for daily reminder here.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
            />
            <button
              onClick={withClickSoundDelay(handleSubscribe)}
              className="px-4 py-2 bg-yellow-300 text-black font-bold text-sm rounded hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
