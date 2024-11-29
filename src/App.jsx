import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WELeague2024 from "./pages/weleague_2024";
import EmpresssCup2024 from "./pages/EmpresssCup2024";
import TeamList from "./pages/EmpresssCup2024_teams";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weleague_2024" element={<WELeague2024 />} />
        <Route path="/empressscup_2024" element={<EmpresssCup2024 />} />
        <Route path="/empressscup_2024_teams" element={<TeamList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
