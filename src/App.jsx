import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmpresssCup2024 from "./pages/EmpresssCup2024";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empressscup_2024" element={<EmpresssCup2024 />} />
      </Routes>

      <footer className="border-t mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-sm text-gray-600 flex justify-center items-center gap-2 flex-wrap">
            <span>Copyright © 2024 Japan Women's Football Introduction</span>
            <span>•</span>
            <span>Licensed under GNU GPL v3.0</span>
            <span>•</span>
            <span>View source on</span>
            <a
              href="https://github.com/b3ssle/Japan-Women-Football-Intro"
              className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;