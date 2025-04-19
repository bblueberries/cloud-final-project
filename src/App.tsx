import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MenuPage from "./pages/MenuPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import RootPage from "./pages/RootPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<RootPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="leaderboard/:topic" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
