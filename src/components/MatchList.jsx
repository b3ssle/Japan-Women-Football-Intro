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
  rounds = [],
  displayType = "round",
  onMatchSelect,
}) => {
  const [selectedType, setSelectedType] = useState(categories[0]?.value);
  const [selectedRound, setSelectedRound] = useState(rounds[0]?.value || "all");
  const [hoveredMatch, setHoveredMatch] = useState(null);

  const formatMatchTitle = (match) => {
    if (match.type === "SOMPO WEリーグ") {
      return `第 ${match.section} 節`;
    }
    if (match.type === "クラシエカップ") {
      return match.round;
    }
    if (match.round === "準決勝" || match.round === "決勝") {
      return match.round;
    }
    return `${match.round} 回戦`;
  };

  const filteredMatches = matches.filter((match) => {
    if (selectedType === "upcoming") {
      return match.status !== "finished";
    }
    if (selectedType === "finished") {
      return match.status === "finished";
    }
    if (
      selectedType === "SOMPO WEリーグ" ||
      selectedType === "クラシエカップ"
    ) {
      return match.type === selectedType && match.status !== "finished";
    }
    return match.type === selectedType;
  });

  return (
    <section>
      {categories.length > 0 && (
        <div className="flex gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedType(category.value)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedType === category.value
                  ? "bg-nadeshiko text-white"
                  : "border border-nadeshiko text-nadeshiko hover:bg-pink-50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="text-center text-sm text-gray-600 mb-4">
        {selectedRound === "all"
          ? "全試合"
          : selectedRound === "準決勝" || selectedRound === "決勝"
          ? selectedRound
          : `${selectedRound} 回戦`}
        ：{filteredMatches.length} 試合
      </div>

      {rounds.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {rounds.map((round) => (
            <button
              key={round.value}
              onClick={() => setSelectedRound(round.value)}
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
      )}

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
