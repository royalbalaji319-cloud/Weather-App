import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";  // <-- This imports your CSS

createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
