import React, { useState } from "react";
import { matches } from "../data/weleague_2024_matches";
import { venues } from "../data/weleague_2024_venues";
import { teams } from "../data/weleague_2024_teams";
import MatchModal_weleague_2024 from "../components/MatchModal_weleague_2024";
import NextMatchSection_weleague_2024 from "../components/NextMatchSection_weleague_2024";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  const date = new Date(year, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

const getMatchDateTime = (match) => {
  const [month, day] = match.date.split("/").map(Number);
  const [hours, minutes] = match.time.split(":").map(Number);
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  const matchDate = new Date(year, month - 1, day);
  matchDate.setHours(hours || 0, minutes || 0, 0, 0);
  return matchDate;
};

const getUpcomingMatch = (matches) => {
  const now = new Date();
  const upcomingMatches = Object.values(matches)
    .filter((match) => {
      if (match.status === "finished") return false;
      const matchDate = getMatchDateTime(match);
      return matchDate > now;
    })
    .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

  return upcomingMatches[0];
};

const matchesBySection = Object.values(matches).reduce((acc, match) => {
  if (match.type !== "SOMPO WEリーグ") return acc;
  if (!acc[match.section]) {
    acc[match.section] = [];
  }
  acc[match.section].push(match);
  return acc;
}, {});

const WELeague2024 = () => {
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";
  const [selectedType, setSelectedType] = useState("SOMPO WEリーグ");
  const [hoveredVenue, setHoveredVenue] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const filteredMatches = Object.values(matches).filter(
    (match) => match.type === selectedType
  );
  const nextMatch = getUpcomingMatch(filteredMatches);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">2024-25 SOMPO WEリーグ</h1>
        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-600 mb-2">
            2024 年 10 月 - 2025 年 5 月
          </p>
          <a
            href="https://weleague.jp/"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            リーグ公式サイト
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">更新日時：{lastUpdateTime}</p>

        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            WEリーグは、2021年9月に開幕した日本初の女子プロサッカーリーグです。WEリーグはWomen
            Empowerment
            Leagueの略称です。この名称には日本に“女子プロサッカー選手”という職業が確立され、リーグを核に関わるわたしたちみんな（WE）が主人公として活躍する社会を目指す、という思いが込められています。
          </p>
          <p className="text-sm text-gray-500">
            出典：
            <a
              href="https://weleague.jp/about/"
              className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WEリーグ
            </a>
          </p>
        </div>
      </section>

      {nextMatch && (
        <NextMatchSection_weleague_2024
          nextMatch={nextMatch}
          venues={venues}
          matches={matches}
          type={selectedType}
        />
      )}

      <section>
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedType("SOMPO WEリーグ")}
            className={`px-4 py-2 rounded transition-colors ${
              selectedType === "SOMPO WEリーグ"
                ? "bg-nadeshiko text-white"
                : "border border-nadeshiko text-nadeshiko hover:bg-pink-50"
            }`}
          >
            WEリーグ
          </button>
          <button
            onClick={() => setSelectedType("クラシエカップ")}
            className={`px-4 py-2 rounded transition-colors ${
              selectedType === "クラシエカップ"
                ? "bg-nadeshiko text-white"
                : "border border-nadeshiko text-nadeshiko hover:bg-pink-50"
            }`}
          >
            クラシエカップ
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches
            .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b))
            .map((match) => {
              const venue = venues[match.venueId];
              return (
                <div
                  key={match.id}
                  className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                    hoveredVenue === match.id
                      ? "border-nadeshiko"
                      : "hover:border-nadeshiko"
                  } ${match.status === "finished" ? "opacity-75" : ""}`}
                  onMouseEnter={() => setHoveredVenue(match.id)}
                  onMouseLeave={() => setHoveredVenue(null)}
                  onClick={() => setSelectedMatch(match)}
                >
                  <div className="font-bold text-nadeshiko mb-2">
                    {match.date} ({getDayOfWeek(match.date)}) {match.time}
                    <span className="text-gray-600 text-sm ml-2">
                      {match.type === "SOMPO WEリーグ"
                        ? `第 ${match.section} 節`
                        : match.round}
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
                    {venue.name_jp}
                    <span className="text-xs ml-2">({venue.region})</span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <MatchModal_weleague_2024
        isOpen={selectedMatch !== null}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
        venue={selectedMatch ? venues[selectedMatch.venueId] : null}
        teams={teams}
      />
    </main>
  );
};

export default WELeague2024;