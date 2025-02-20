import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import createRoot
import "./index.css";
import CertificateProgress from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CertificateProgress />
  </React.StrictMode>
);
