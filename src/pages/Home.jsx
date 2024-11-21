import React, { useState } from "react";
import { teams } from "../data/empressscup_2024_teams";

function Home() {
 const weLeagueTeams = Object.values(teams).filter(
   (team) => team.category === "WEリーグ"
 );
 const [hoveredTeam, setHoveredTeam] = useState(null);

 return (
   <main className="flex-grow">
 <div className="max-w-7xl mx-auto px-6 py-8">
   <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
   <p className="text-xl text-gray-600 mb-8">
     日本女子サッカーの世界を探索する！
   </p>

   <div className="flex flex-col gap-8">
     <svg
       viewBox="0 0 500 400"
       className="w-full max-w-2xl mx-auto"
       style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
     >
       <path
         d="M350 50 L400 80 L420 120 L390 150 L340 140 L320 100 L330 70 Z"
         className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
         title="Hokkaido"
       />
       <path
         d="M300 140 L320 160 L350 180 L380 220 L350 260 L300 300 L250 320 L200 310 L180 280 L160 240 L180 200 L220 180 L260 170 Z"
         className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
         title="Honshu"
       />
       <path
         d="M180 300 L220 290 L240 310 L220 330 L190 330 L170 320 Z"
         className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
         title="Shikoku"
       />
       <path
         d="M120 280 L150 270 L170 290 L160 330 L130 350 L100 330 L90 300 Z"
         className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
         title="Kyushu"
       />

       <g className="cities">
         {weLeagueTeams.map((team) => {
           const coordinates = getTeamCoordinates(team.id);
           return (
             <circle
               key={team.id}
               cx={coordinates.x}
               cy={coordinates.y}
               r="4"
               className={`${
                 hoveredTeam === team.id 
                   ? "fill-nadeshiko-dark" 
                   : "fill-nadeshiko"
               } transition-all cursor-pointer`}
               onMouseEnter={() => setHoveredTeam(team.id)}
               onMouseLeave={() => setHoveredTeam(null)}
               title={team.name}
             />
           );
         })}
       </g>
     </svg>

     <div className="grid grid-cols-2 gap-4">
       <div className="space-y-2">
         {weLeagueTeams.slice(0, 6).map((team) => (
           <div
             key={team.id}
             className={`border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
               hoveredTeam === team.id ? "border-nadeshiko bg-nadeshiko/5" : ""
             }`}
             onMouseEnter={() => setHoveredTeam(team.id)}
             onMouseLeave={() => setHoveredTeam(null)}
           >
             <h3 className="font-bold text-base">
               <a
                 href={team.website}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-nadeshiko transition-colors"
               >
                 {team.name}
               </a>
             </h3>
             <p className="text-xs text-gray-600 mt-1">
               {team.homeStadium}, {team.region}
             </p>
           </div>
         ))}
       </div>

       <div className="space-y-2">
         {weLeagueTeams.slice(6).map((team) => (
           <div
             key={team.id}
             className={`border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
               hoveredTeam === team.id ? "border-nadeshiko bg-nadeshiko/5" : ""
             }`}
             onMouseEnter={() => setHoveredTeam(team.id)}
             onMouseLeave={() => setHoveredTeam(null)}
           >
             <h3 className="font-bold text-base">
               <a
                 href={team.website}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-nadeshiko transition-colors"
               >
                 {team.name}
               </a>
             </h3>
             <p className="text-xs text-gray-600 mt-1">
               {team.homeStadium}, {team.region}
             </p>
           </div>
         ))}
       </div>
     </div>
   </div>
 </div>
</main>
 );
}

// チーム座標のヘルパー関数
function getTeamCoordinates(teamId) {
 const coordinates = {
   omiya: { x: 280, y: 195 },
   beleza: { x: 285, y: 200 },
   albirex: { x: 270, y: 180 },
   sendai: { x: 290, y: 160 },
   stellas: { x: 280, y: 205 },
   parceiro: { x: 265, y: 190 },
   urawa: { x: 280, y: 198 },
   hiroshima: { x: 220, y: 250 },
   chifure: { x: 278, y: 193 },
   inac: { x: 240, y: 240 },
   jef: { x: 290, y: 195 },
   cerezo: { x: 235, y: 235 }
 };

 return coordinates[teamId] || { x: 0, y: 0 };
}

export default Home;