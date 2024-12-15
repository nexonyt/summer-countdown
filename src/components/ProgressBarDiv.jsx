import React, { useEffect, useState } from "react";
import "./ProgressBar.css"; // Stylizacja

const ProgressBar = ({ percentage }) => {
  const [progress, setProgress] = useState(0);
  const duration = 1000; // Czas animacji w milisekundach

  useEffect(() => {
    let startTimestamp = null;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      // Oblicz nowy procent na podstawie czasu
      const nextProgress = Math.min(
        (elapsed / duration) * percentage,
        percentage
      );
      setProgress(nextProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  return (
    <div className="progress-bar-main">
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      >
        <span className="progress-bar-text">{progress.toFixed(3)}%</span>
      </div>
    </div>
    </div>
  );
};

export default ProgressBar;
