import React, { useState, useEffect } from "react";
import { matches } from "../data/highschoolwomens_2024_matches";
import { venues } from "../data/highschoolwomens_2024_venues";
import { teams } from "../data/highschoolwomens_2024_teams";
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

function HighschoolWomens2024() {
  const nextMatch = getUpcomingMatch();
  const [selectedRound, setSelectedRound] = useState("1");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";

  const rounds = [
    { value: "1", label: "１回戦" },
    { value: "2", label: "２回戦" },
    { value: "3", label: "３回戦" },
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
          第 33 回全日本高等学校女子サッカー選手権大会
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-600 mb-2">
            2024 年 12 月 29 日 - 2025 年 1 月 12 日
          </p>
          <a
            href="https://www.jfa.jp/match/highschool_womens_2024/"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            大会情報
          </a>
          <a
            href="https://www.jfa.jp/match/highschool_womens_2024/tv.html"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            放送情報
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">更新日時：{lastUpdateTime}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            全日本高等学校女子サッカー選手権大会は日本サッカー協会（JFA）が主催し、高校女子サッカー部の頂点を決める大会です。各都道府県の予選を勝ち抜いたチームが、全国の強豪校と対戦し、日本一を目指します。
          </p>
          <p className="text-sm text-gray-500">
            出典：
            <a
              href="https://www.jfa.jp/match/highschool_womens_2024/about.html"
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
        allMatches={Object.values(matches)}
        venues={venues}
        rounds={rounds}
        selectedRound={selectedRound}
        onRoundChange={setSelectedRound}
        onMatchSelect={setSelectedMatch}
      />
    </main>
  );
}

export default HighschoolWomens2024;
