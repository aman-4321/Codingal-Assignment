import React from "react";
import useCountdownTimer from "../hooks/useCountdownTimer";

interface CountdownTimerProps {
  isRunning: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ isRunning }) => {
  const { minutes, seconds } = useCountdownTimer(10 * 60, isRunning);

  return (
    <div className="text-lg font-semibold text-black text-center">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountdownTimer;
