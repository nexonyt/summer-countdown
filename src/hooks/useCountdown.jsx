import { useState, useEffect } from 'react';

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    percentageLeft: 100,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const totalTime = target.getTime() - now.getTime();
      const totalDuration = target.getTime() - new Date().setHours(0, 0, 0, 0); // Total duration since midnight

      if (totalTime <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
          percentageLeft: 0,
        });
        return;
      }

      const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
      const milliseconds = totalTime % 1000;

      const percentageLeft = ((totalTime / totalDuration) * 100).toFixed(2);

      setTimeLeft({ days, hours, minutes, seconds, milliseconds, percentageLeft });
    };

    const timerInterval = setInterval(updateTimer, 50); // Update every 50ms for precision

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
