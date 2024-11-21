import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
