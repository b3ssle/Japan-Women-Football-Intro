import React, { useState, useEffect } from "react";
import { matches } from "../data/weleague_2024_matches";
import { venues } from "../data/weleague_2024_venues";
import { teams } from "../data/weleague_2024_teams";
import MatchModal from "../components/MatchModal";
import NextMatchSection from "../components/NextMatchSection";
import MatchList from "../components/MatchList";

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

const WELeague2024 = () => {
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";
  const [selectedType, setSelectedType] = useState("SOMPO WEリーグ");
  const [hoveredVenue, setHoveredVenue] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const activeMatches = Object.values(matches).filter((match) => {
    if (selectedType === "finished") {
      return match.status === "finished";
    }
    if (selectedType === "upcoming") {
      return match.status !== "finished";
    }
    return match.type === selectedType && match.status !== "finished";
  });

  const nextMatch = getUpcomingMatch(Object.values(matches));

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
  };

  useEffect(() => {
    if (nextMatch) {
      setSelectedType(nextMatch.type);
    }
  }, [nextMatch]);

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
            Leagueの略称です。この名称には日本に"女子プロサッカー選手"という職業が確立され、リーグを核に関わるわたしたちみんな（WE）が主人公として活躍する社会を目指す、という思いが込められています。
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
        <NextMatchSection
          nextMatch={nextMatch}
          matches={Object.values(matches)}
          venues={venues}
          onMatchClick={setSelectedMatch}
        />
      )}

      <MatchModal
        isOpen={selectedMatch !== null}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
        venue={selectedMatch ? venues[selectedMatch.venueId] : null}
        teams={teams}
      />

      <MatchList
        matches={Object.values(matches)}
        venues={venues}
        categories={[
          { value: "finished", label: "終了した試合" },
          { value: "SOMPO WEリーグ", label: "WEリーグ" },
          { value: "クラシエカップ", label: "クラシエカップ" },
        ]}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onMatchSelect={setSelectedMatch}
      />
    </main>
  );
};

export default WELeague2024;
