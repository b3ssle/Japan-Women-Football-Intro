import React, { useState } from "react";

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

const MatchList = ({
  matches,
  venues,
  categories = [],
  selectedType,
  onTypeChange,
  displayType = "round",
  rounds = [],
  selectedRound,
  onRoundChange,
  onMatchSelect,
}) => {
  const [hoveredMatch, setHoveredMatch] = useState(null);

  const formatMatchTitle = (match) => {
    if (match.type === "SOMPO WEリーグ") {
      return `第 ${match.section} 節`;
    }
    if (match.type === "クラシエカップ") {
      return match.round;
    }
    if (
      match.round === "準々決勝" ||
      match.round === "準決勝" ||
      match.round === "決勝"
    ) {
      return match.round;
    }
    return `${match.round} 回戦`;
  };

  const filteredMatches = matches.filter((match) => {
    if (rounds.length > 0) {
      if (selectedRound === "all") {
        return true;
      }
      return match.round === selectedRound;
    }

    if (categories.length > 0) {
      if (selectedType === "finished") {
        return match.status === "finished";
      }
      if (selectedType === "upcoming") {
        return match.status !== "finished";
      }
      return match.type === selectedType && match.status !== "finished";
    }

    return true;
  });

  const renderHeaderButtons = () => {
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
  };

  const renderTitle = () => {
    if (rounds.length > 0) {
      return `${
        selectedRound === "all"
          ? "全試合"
          : selectedRound === "準々決勝" ||
            selectedRound === "準決勝" ||
            selectedRound === "決勝"
          ? selectedRound
          : `${selectedRound} 回戦`
      }：${filteredMatches.length} 試合`;
    }

    if (categories.length > 0) {
      let typeDisplay = selectedType;
      if (selectedType === "SOMPO WEリーグ") {
        typeDisplay = "WEリーグ";
      } else if (selectedType === "finished") {
        typeDisplay = "終了した試合";
      }
      return `${typeDisplay}：${filteredMatches.length} 試合`;
    }
  };

  return (
    <section>
      {renderHeaderButtons()}

      <div className="text-center text-sm text-gray-600 mb-4">
        {renderTitle()}
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
                  <span className="text-gray-600 text-sm ml-2">
                    {formatMatchTitle(match)}
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
  );
};

export default MatchList;
