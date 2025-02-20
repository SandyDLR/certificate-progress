import React, { useState, useEffect } from "react";
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

  // Load Transifex Live script on component mount
  useEffect(() => {
    window.liveSettings = {
      api_key: "e63f68545928438f89e2ecc80453d76a",
      variables_parser: function (text, fn) {
        // Detect numbers and wrap them as variables for translation
        return text.replace(/\b\d+\b/g, function (match) {
          return fn(match);
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
        aria-label={`${
          certificate.name
        }, <var>${certificate.completedCount}</var> out of <var>${certificate.totalCount}</var> steps completed`}
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

