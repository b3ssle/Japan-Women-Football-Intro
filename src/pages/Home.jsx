import React, { useState } from "react";
import { Map, Gauge } from "lucide-react";
import { teams } from "../data/empressscup_2024_teams";
import { getCurrentWeekMatches } from "../components/GetAllMatches";
import MatchModal from "../components/MatchModal_all_2024";
import WeeklyVenuesMap from "../components/AllMatchesMap";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const date = new Date(2024, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const weeklyMatches = getCurrentWeekMatches();
  const uniqueVenues = [
    ...new Set(weeklyMatches.map((match) => match.venue.id)),
  ].map((id) => weeklyMatches.find((match) => match.venue.id === id).venue);

  const handleVenueClick = (venue) => {
    const venueMatches = weeklyMatches.filter(
      (match) => match.venue.id === venue.id
    );
    if (venueMatches.length > 0) {
      setSelectedMatch(venueMatches[0]);
    }
  };

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
        <p className="text-xl text-gray-600 mb-12">
          日本女子サッカーの世界を探索する！
        </p>

        <div className="flex flex-col gap-12">
          {/* 地圖組件 */}
          {/* <WeeklyVenuesMap
            matches={weeklyMatches}
            onVenueClick={handleVenueClick}
          /> */}

          {/* 本週賽事 */}
          <div>
            <h2 className="text-2xl mb-6 bg-nadeshiko text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-6 h-6" />
                <span>
                  今週の試合：{weeklyMatches.length} 試合が{" "}
                  {uniqueVenues.length} か所の会場で行われます！
                </span>
              </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <span>
                          {match.round === "準決勝" || match.round === "決勝"
                            ? ` ${match.round}`
                            : ` ${match.round} 回戦`}
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{match.team1}</div>
                      <div className="text-sm text-pink-600 mx-2">
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
        </div>

        {/* Modal */}
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
