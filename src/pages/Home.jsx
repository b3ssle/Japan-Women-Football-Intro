import React, { useState } from "react";
import { teams } from "../data/empressscup_2024_teams";
import { getCurrentWeekMatches } from "../components/GetAllMatches";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const date = new Date(2024, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

function Home() {
  const weLeagueTeams = Object.values(teams).filter(
    (team) => team.category === "WEリーグ"
  );
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const weeklyMatches = getCurrentWeekMatches();

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
        <p className="text-xl text-gray-600 mb-8">
          日本女子サッカーの世界を探索する！
        </p>

        <div className="flex flex-col gap-12">
          {/* 地圖部分待添加 */}

          {/* 本週賽事 */}
          <div>
            <h2 className="text-2xl mb-6 bg-nadeshiko text-white px-4 py-2 rounded">
              今週の試合：{weeklyMatches.length} 試合が {new Set(weeklyMatches.map((match) => match.venue.id)).size} か所の会場で行われます！
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyMatches.map((match) => (
                <a
                  key={match.id}
                  href={match.matchinfo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="text-sm text-pink-600 font-medium mb-1">
                    {match.competition}
                    {match.round && match.type === "SOMPO WEリーグ" && (
                      <span> 第 {match.round} 節</span>
                    )}
                    {match.round && match.type === "クラシエカップ" && (
                      <span> {match.round}</span>
                    )}
                    {match.round && !match.type && (
                      <span>
                        {match.round === "準決勝" || match.round === "決勝"
                          ? ` ${match.round}`
                          : ` ${match.round} 回戦`}
                      </span>
                    )}
                  </div>
                  <div className="font-bold mb-2">
                    {match.date} ({getDayOfWeek(match.date)}) {match.time}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">{match.team1}</div>
                    <div className="text-sm text-pink-600">
                      {match.status === "finished" ? match.score : "vs"}
                    </div>
                    <div className="text-sm">{match.team2}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {match.venue.name_jp}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
