import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";
import toast from "react-hot-toast";

export default function RootPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          navigate("/menu");
        }
      } catch {}
    };

    checkLogin();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithRedirect();
    } catch (err: any) {
      toast.error(`Login failed: ${err.message || "Unknown error"}`);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center space-y-6 max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-pink-600">
          Welcome to Meme Quiz
        </h1>
        <p className="text-gray-600 text-sm">
          Login or sign up with your Cognito account to start the fun.
        </p>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition"
        >
          Sign In / Sign Up with Cognito
        </button>
      </div>
    </div>
  );
}
