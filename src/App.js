import React, { useState, useEffect } from "react";
import "./App.css"; // Optional for styling

const CertificateProgress = () => {
  const [certificate, setCertificate] = useState({
    completedCount: 1,
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

  // Dynamically generate Transifex Live-friendly aria-label
  const getAriaLabel = () => {
    return `React Fundamentals, ${certificate.completedCount} out of ${certificate.totalCount} steps completed`;
  };

  // Load Transifex Live script on component mount
  useEffect(() => {
    window.liveSettings = {
      api_key: "e63f68545928438f89e2ecc80453d76a",
      variables_parser: function (text, fn) {
        return text.replace(/\b\d+\b/g, function (match) {
          return fn(match); // Convert numbers into variables for Transifex Live
        });
      },
    };

    const script = document.createElement("script");
    script.src = "//cdn.transifex.com/live.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup (optional)
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container">
      <div
        aria-label={getAriaLabel()} // Dynamically update aria-label
        tx-attrs="aria-label" // ✅ Ensure Transifex Live processes aria-label
        className="progress-box"
      >
        <span aria-hidden="true">{certificate.completedCount} / {certificate.totalCount}</span>
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
