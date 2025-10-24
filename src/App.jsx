// src/App.jsx
import React from "react";
import AppRouter from "./routes/AppRouter.jsx";
import useAnimations from "./hooks/useAnimations.js";


import "./styles/animations.css";

export default function App() {
  // ✅ Enable scroll-based animations (fade/slide)
  useAnimations();

  return (
    <div className="app">
      {/* The router handles Navbar, pages, and Footer */}
      <AppRouter />
    </div>
  );
}
