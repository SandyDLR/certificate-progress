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

  // Load Transifex Live script on component mount
  useEffect(() => {
    window.liveSettings = {
      api_key: "e63f68545928438f89e2ecc80453d76a",
      variables_parser: function (text, fn) {
        let firstNumber = null;
  
        return text.replace(/\b\d+\b/g, function (match) {
          if (firstNumber === null) {
            firstNumber = fn(match); // First detected number becomes {{0}}
            return firstNumber;
          }
          return firstNumber; // Reuse the same variable for second occurrence
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
        aria-label={`React Fundamentals, ${certificate.completedCount} out of ${certificate.totalCount} steps completed`}
        tx-attrs="aria-label" // ✅ Mark aria-label for translation
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