import React, { useState, useEffect } from "react";
import { matches } from "../data/Joshi_Youth_U18_2024_matches";
import { venues } from "../data/Joshi_Youth_U18_2024_venues";
import { teams } from "../data/Joshi_Youth_U18_2024_teams";
import MatchModal from "../components/MatchModal";
import NextMatchSection from "../components/NextMatchSection";
import MatchList from "../components/MatchList";

const getUpcomingMatch = () => {
  const now = new Date();
  const upcomingMatches = Object.values(matches)
    .filter((match) => {
      if (match.status === "finished") return false;
      const [month, day] = match.date.split("/").map(Number);
      const year = parseInt(month) >= 11 ? 2024 : 2025;
      const [hours, minutes] = match.time.split(":").map(Number);
      const matchDate = new Date(year, month - 1, day);
      matchDate.setHours(hours || 0, minutes || 0, 0, 0);
      return matchDate > now;
    })
    .sort((a, b) => {
      const [monthA, dayA] = a.date.split("/").map(Number);
      const [monthB, dayB] = b.date.split("/").map(Number);
      const yearA = parseInt(monthA) >= 11 ? 2024 : 2025;
      const yearB = parseInt(monthB) >= 11 ? 2024 : 2025;
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA - dateB;
    });

  return upcomingMatches[0];
};

function JoshiYouthU182024() {
  const nextMatch = getUpcomingMatch();
  const [selectedRound, setSelectedRound] = useState("1");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";

  const rounds = [
    { value: "1", label: "１回戦" },
    { value: "準々決勝", label: "準々決勝" },
    { value: "準決勝", label: "準決勝" },
    { value: "決勝", label: "決　勝" },
    { value: "all", label: "全試合" },
  ];

  const filteredMatches = Object.values(matches).filter((match) => {
    if (selectedRound === "all") return true;
    return match.round === selectedRound;
  });

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setSelectedRound(match.round);
  };

  useEffect(() => {
    if (nextMatch) {
      setSelectedRound(nextMatch.round);
    }
  }, [nextMatch]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          JFA 第 28 回全日本 U-18 女子サッカー選手権大会
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-600 mb-2">
            2025 年 1 月 3 日 - 2025 年 1 月 11 日
          </p>
          <a
            href="https://www.jfa.jp/match/joshi_youth_u18_2024/"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            大会情報
          </a>
          <a
            href="https://www.jfa.jp/match/joshi_youth_u18_2024/tv.html"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            配信情報
          </a>
          <a
            href="#/Joshi_Youth_U18_2024_teams"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            チーム紹介
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">更新日時：{lastUpdateTime}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            公益財団法人日本サッカー協会は、日本国内における女子サッカーの技術向上と健全な心身の育成を図り、広く女子サッカーの普及振興に寄与すること、そしてクラブチームのさらなる増加、活動の活性化を目的として、本大会を実施する。
          </p>
          <p className="text-sm text-gray-500">
            出典：
            <a
              href="https://www.jfa.jp/match/joshi_youth_u18_2024/"
              className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              JFA.jp
            </a>
          </p>
        </div>
      </section>

      <NextMatchSection
        nextMatch={nextMatch}
        matches={Object.values(matches)}
        venues={venues}
        displayType="round"
        onMatchClick={setSelectedMatch}
      />

      <MatchModal
        isOpen={selectedMatch !== null}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
        venue={selectedMatch ? venues[selectedMatch.venueId] : null}
        teams={teams}
      />

      <MatchList
        matches={filteredMatches}
        venues={venues}
        rounds={rounds}
        selectedRound={selectedRound}
        onRoundChange={setSelectedRound}
        onMatchSelect={setSelectedMatch}
      />
    </main>
  );
}

export default JoshiYouthU182024;
