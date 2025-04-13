export const withClickSoundDelay = (
  callback: () => void | Promise<void>,
  delay: number = 200
) => {
  return async () => {
    try {
      const audio = new Audio("/audio/click.wav");
      audio.volume = 0.5;
      await audio.play();
    } catch (err) {
      console.warn("Click sound failed:", err);
    }

    setTimeout(() => {
      callback();
    }, delay);
  };
};
