import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { withClickSoundDelay } from "../utils/withClickSoundDelay";

export default function AppLayout() {
  const bgAudioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const bgAudio = bgAudioRef.current;
    if (bgAudio) {
      bgAudio.volume = 0.1;
      bgAudio.muted = true;

      bgAudio.play().catch(() => {
        const resumeAudio = () => {
          bgAudio.play();
          document.removeEventListener("click", resumeAudio);
        };
        document.addEventListener("click", resumeAudio);
      });
    }
  }, []);

  const toggleMute = () => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  };

  return (
    <div className="relative min-h-screen">
      {/* Mute Toggle */}
      <button
        onClick={withClickSoundDelay(toggleMute)}
        className="absolute top-4 left-4 bg-white bg-opacity-80 border border-gray-300 rounded-full px-3 py-1 text-sm font-semibold shadow hover:bg-opacity-100 transition z-50"
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      <audio ref={bgAudioRef} src="/audio/bg.mp3" loop hidden />
      <Outlet />
    </div>
  );
}
