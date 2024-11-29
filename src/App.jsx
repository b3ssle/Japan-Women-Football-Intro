import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WELeague2024 from "./pages/weleague_2024";
import EmpresssCup2024 from "./pages/EmpresssCup_2024";
import TeamList from "./pages/EmpresssCup_2024_teams";
import UniversityWomens from "./pages/UniversityWomens_2024";
import HighschoolWomens2024 from "./pages/HighschoolWomens_2024";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weleague_2024" element={<WELeague2024 />} />
        <Route path="/empressscup_2024" element={<EmpresssCup2024 />} />
        <Route path="/UniversityWomens_2024" element={<UniversityWomens />} />
        <Route
          path="/HighschoolWomens_2024"
          element={<HighschoolWomens2024 />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
