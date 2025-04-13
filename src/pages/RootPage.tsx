// src/pages/RootPage.tsx

export default function RootPage() {
  const handleLogin = () => {};

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
