import React, { useState } from "react";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  const date = new Date(year, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

const resolveTeamName = (teamName, allMatches) => {
  if (!teamName?.includes("勝者")) return teamName;

  const matchId = teamName.match(/M\d+/)[0];
  const previousMatch = allMatches?.find((m) => m.id === matchId);

  if (!previousMatch || previousMatch.status !== "finished") {
    return teamName;
  }

  if (previousMatch.score?.includes("PK")) {
    const [score, pk] = previousMatch.score.split("(");
    const [score1, score2] = score.split("-").map(Number);
    const [_, pk1, pk2] = pk.match(/PK:(\d+)-(\d+)/) || [];

    if (score1 > score2) return previousMatch.team1;
    if (score2 > score1) return previousMatch.team2;
    if (pk1 && pk2) {
      return parseInt(pk1) > parseInt(pk2)
        ? previousMatch.team1
        : previousMatch.team2;
    }
  } else {
    const [score1, score2] = previousMatch.score?.split("-").map(Number) || [0, 0];
    if (score1 > score2) return previousMatch.team1;
    if (score2 > score1) return previousMatch.team2;
  }

  return teamName;
};

const MatchList = ({
  matches = [],
  allMatches = [],
  venues = {},
  categories = [],
  selectedType = "",
  onTypeChange,
  rounds = [],
  selectedRound = "",
  onRoundChange,
  onMatchSelect,
}) => {
  const [hoveredMatch, setHoveredMatch] = useState(null);

  const renderTitle = () => {
    if (categories.length > 0) {
      if (selectedType === "SOMPO WEリーグ") {
        const currentMatch = matches[0];
        return currentMatch?.section
          ? `第 ${currentMatch.section} 節：${matches.length} 試合`
          : `WEリーグ：${matches.length} 試合`;
      }
      if (selectedType === "クラシエカップ") {
        const currentMatch = matches[0];
        return currentMatch?.round
          ? `${currentMatch.round}：${matches.length} 試合`
          : `クラシエカップ：${matches.length} 試合`;
      }
      if (selectedType === "finished") {
        return `終了した試合：${matches.length} 試合`;
      }
    } else if (rounds.length > 0) {
      return `${
        selectedRound === "all"
          ? "全試合"
          : selectedRound === "準々決勝" ||
            selectedRound === "準決勝" ||
            selectedRound === "決勝"
          ? selectedRound
          : `${selectedRound} 回戦`
      }：${matches.length} 試合`;
    }
    return `${matches.length} 試合`;
  };

  const renderNav = () => {
    if (categories.length > 0) {
      return (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onTypeChange(category.value)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedType === category.value
                  ? "bg-nadeshiko text-white"
                  : "border border-nadeshiko text-nadeshiko hover:bg-nadeshiko/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      );
    }
    if (rounds.length > 0) {
      return (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {rounds.map((round) => (
            <button
              key={round.value}
              onClick={() => onRoundChange(round.value)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedRound === round.value
                  ? "bg-nadeshiko text-white"
                  : "border border-nadeshiko text-nadeshiko hover:bg-nadeshiko/10"
              }`}
            >
              {round.label}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      {renderNav()}

      <div className="text-center text-sm text-gray-600 mb-4">
        {renderTitle()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => {
          const venue = venues[match.venueId];
          const team1Name = resolveTeamName(match.team1, allMatches);
          const team2Name = resolveTeamName(match.team2, allMatches);

          return (
            <div
              key={match.id}
              className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                hoveredMatch === match.id
                  ? "border-nadeshiko"
                  : "hover:border-nadeshiko"
              } ${match.status === "finished" ? "opacity-75" : ""}`}
              onMouseEnter={() => setHoveredMatch(match.id)}
              onMouseLeave={() => setHoveredMatch(null)}
              onClick={() => onMatchSelect(match)}
            >
              <div className="font-bold text-nadeshiko mb-2">
                {match.date} ({getDayOfWeek(match.date)}) {match.time}
                {match.type === "SOMPO WEリーグ" && match.section && (
                  <span className="text-gray-600 text-sm ml-2">
                   第 {match.section} 節
                  </span>
                )}
                {match.type === "クラシエカップ" && match.round && (
                  <span className="text-gray-600 text-sm ml-2">
                    {match.round}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{team1Name}</div>
                  <div className="text-sm text-nadeshiko mx-2">
                    {match.status === "finished" ? match.score : "VS"}
                  </div>
                  <div className="text-sm font-medium">{team2Name}</div>
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
  );
};

export default MatchList;
