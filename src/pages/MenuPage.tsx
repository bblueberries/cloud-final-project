import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import { Question } from "../types/quiz";
import { quizList } from "../data/quizList";
import { subscribeToDailyReminder } from "../api/sns";

export default function MenuPage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const [email, setEmail] = useState("");

  const handleStart = (questions: Question[], title: string) => {
    startQuiz(questions, title);
    navigate("/quiz");
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await subscribeToDailyReminder(email);
      alert("🎉 Subscribed successfully! Check your inbox to confirm.");
      setEmail(""); // clear input
    } catch (err: any) {
      alert("❌ Subscription failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-600">Meme Quiz</h1>
          <p className="text-gray-600 text-lg">
            Pick a quiz or subscribe for daily meme madness!
          </p>
        </div>

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

        <hr className="border-gray-300" />

        {/* Email input + subscribe button */}
        <div className="space-y-3">
          <p className="text-gray-700 font-medium text-sm">
            Want daily meme quiz reminders?
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
              onClick={handleSubscribe}
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
