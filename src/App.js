import React, { useState } from "react";
import "./App.css"; // Optional for styling

const CertificateProgress = () => {
  const [certificate, setCertificate] = useState({
    name: "React Fundamentals",
    completedCount: 2,
    totalCount: 5,
  });

  // Function to increase completed count
  const increaseProgress = () => {
    setCertificate((prev) => ({
      ...prev,
      completedCount: Math.min(prev.completedCount + 1, prev.totalCount),
    }));
  };

  // Function to decrease completed count
  const decreaseProgress = () => {
    setCertificate((prev) => ({
      ...prev,
      completedCount: Math.max(prev.completedCount - 1, 0),
    }));
  };

  return (
    <div className="container">
      <div
        aria-label={`${certificate.name}, ${certificate.completedCount} out of ${certificate.totalCount} steps completed`}
        className="progress-box"
      >
        {certificate.completedCount} / {certificate.totalCount}
      </div>
      <div className="buttons">
        <button onClick={decreaseProgress} disabled={certificate.completedCount === 0}>
          Previous Step
        </button>
        <button onClick={increaseProgress} disabled={certificate.completedCount === certificate.totalCount}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CertificateProgress;
