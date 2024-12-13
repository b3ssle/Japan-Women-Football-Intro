import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WELeague2024 from "./pages/WeLeague_2024";
import EmpresssCup2024 from "./pages/EmpresssCup_2024";
import EmpresssCup2024Teams from "./pages/EmpresssCup_2024_teams";
import UniversityWomens from "./pages/UniversityWomens_2024";
import UniversityWomens2024Teams from "./pages/UniversityWomens_2024_teams";
import HighschoolWomens2024 from "./pages/HighschoolWomens_2024";
import JoshiYouthU152024 from "./pages/Joshi_Youth_U15_2024";
import YouthU15Teams2024 from "./pages/Joshi_Youth_U15_2024_teams";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WeLeague_2024" element={<WELeague2024 />} />
        <Route path="/EmpresssCup_2024" element={<EmpresssCup2024 />} />
        <Route
          path="/EmpresssCup_2024_teams"
          element={<EmpresssCup2024Teams />}
        />
        <Route path="/Joshi_Youth_U15_2024" element={<JoshiYouthU152024 />} />
        <Route
          path="/Joshi_Youth_U15_2024_teams"
          element={<YouthU15Teams2024 />}
        />
        <Route path="/UniversityWomens_2024" element={<UniversityWomens />} />
        <Route
          path="/UniversityWomens_2024_teams"
          element={<UniversityWomens2024Teams />}
        />
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
