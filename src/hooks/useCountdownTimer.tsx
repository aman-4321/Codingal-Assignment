import { useState, useEffect } from "react";

interface TimerControls {
  minutes: number;
  seconds: number;
  reset: () => void;
}

const useCountdownTimer = (
  initialTime: number,
  isRunning: boolean
): TimerControls => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let interval: number;

    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning, time]);

  const reset = () => setTime(initialTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return { minutes, seconds, reset };
};

export default useCountdownTimer;
