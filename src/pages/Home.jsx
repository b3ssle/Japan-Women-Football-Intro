import React, { useState } from "react";
import { Map, Gauge } from "lucide-react";
import { teams } from "../data/empressscup_2024_teams";
import { getCurrentWeekMatches } from "../components/GetAllMatches";
import MatchModal from "../components/MatchModal";
import WeeklyVenuesMap from "../components/AllMatchesMap";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  const date = new Date(year, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const weeklyMatches = getCurrentWeekMatches();
  const uniqueVenues = [
    ...new Set(weeklyMatches.map((match) => match.venue.id)),
  ].map((id) => weeklyMatches.find((match) => match.venue.id === id).venue);

  const handleVenueClick = (matchData) => {
    console.log("Clicked match:", matchData);
    setSelectedMatch(matchData);
  };

  const formatRoundDisplay = (match) => {
    if (!match.round) return "";

    if (match.competition === "WEリーグ") {
      if (match.type === "クラシエカップ") {
        return match.round;
      }
      return match.round;
    }
    if (
      match.competition === "皇后杯" ||
      match.competition === "高円宮妃杯 U15" ||
      match.competition === "全日本大学女子サッカー選手権" ||
      match.competition === "全日本高校女子サッカー選手権"
    ) {
      return match.round;
    }
    if (match.round === "準々決勝" || match.round === "準決勝" || match.round === "決勝") {
      return match.round;
    }
    return match.round;
  };

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
        <p className="text-xl text-gray-600 mb-12">
          日本女子サッカーの世界を探索する！
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側：賽事列表 */}
          <div>
            <h2 className="text-2xl mb-6 bg-nadeshiko text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Gauge className="w-6 h-6" />
              <span>
                今週の試合：{weeklyMatches.length} 試合が {uniqueVenues.length}{" "}
                会場で行われます！
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {weeklyMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="font-bold text-nadeshiko mb-2">
                    {match.date} ({getDayOfWeek(match.date)}) {match.time}
                    <span className="text-gray-600 text-sm ml-2">
                      {match.competition}
                      {match.round && (
                        <span>{` ${formatRoundDisplay(match)}`}</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{match.team1}</div>
                      <div className="text-sm text-nadeshiko mx-2">
                        {match.status === "finished" ? match.score : "VS"}
                      </div>
                      <div className="text-sm font-medium">{match.team2}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {match.venue.name_jp}
                    <span className="text-xs ml-2">({match.venue.region})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側：地圖 */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl mb-6 bg-nadeshiko text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Map className="w-6 h-6" />
              今週の試合マップ
            </h2>
            <div className="relative z-0 bg-white rounded-lg shadow h-[600px] overflow-hidden">
              <WeeklyVenuesMap
                matches={weeklyMatches}
                onVenueClick={handleVenueClick}
              />
            </div>
          </div>
        </div>

        <MatchModal
          isOpen={selectedMatch !== null}
          onClose={() => setSelectedMatch(null)}
          match={selectedMatch}
          venue={selectedMatch?.venue}
          teams={teams}
        />
      </div>
    </main>
  );
}
