import React, { useState } from "react";
import { matches } from "../data/empressscup_2024_matches";
import { venues } from "../data/empressscup_2024_venues";
import { teams } from "../data/empressscup_2024_teams";
import MatchModal from "./MatchModal_empressscup_2024";

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
  const matchDate = new Date(match.year || 2024, month - 1, day);
  matchDate.setHours(hours, minutes, 0, 0);
  return matchDate;
};

const NextMatchSection = ({ nextMatch, roundMatches }) => {
  const sameRoundMatches = Object.values(matches)
    .filter((match) => match.round === nextMatch.round)
    .filter((match) => {
      if (match.status === "finished") return false;
      return getMatchDateTime(match) >= new Date();
    })
    .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

  const venue = venues[nextMatch.venueId];

  return (
    <div className="bg-gradient-to-r from-pink-100/50 to-pink-50/50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-8 flex items-center justify-start">
        <span className="w-2 h-8 bg-pink-600 mr-3"></span>
        次の試合：
        {nextMatch.round === "準決勝" || nextMatch.round === "決勝"
          ? nextMatch.round
          : `${nextMatch.round} 回戦`}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-left space-y-2">
          <div className="text-3xl font-bold">
            {nextMatch.date} ({getDayOfWeek(nextMatch.date)}) {nextMatch.time}
          </div>
          {nextMatch.status === "finished" ? (
            <>
              <div className="text-lg font-bold">{nextMatch.team1}</div>
              <div className="text-xl font-bold text-nadeshiko">
                {nextMatch.score}
              </div>
              <div className="text-lg font-bold">{nextMatch.team2}</div>
            </>
          ) : (
            <>
              <div className="text-lg font-bold">{nextMatch.team1}</div>
              <div className="text-xl font-bold text-nadeshiko">VS</div>
              <div className="text-lg font-bold">{nextMatch.team2}</div>
            </>
          )}
          <div className="mt-4">
            <div className="font-bold text-lg">会場</div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-nadeshiko"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <div>
                <div className="text-lg">{venue.name_jp}</div>
                <div className="text-sm text-gray-600">{venue.region}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-2">
          <div className="font-bold text-lg mb-4">
            {nextMatch.round === "準決勝" || nextMatch.round === "決勝"
              ? `${nextMatch.round}の試合一覧`
              : `${nextMatch.round} 回戦の試合一覧`}
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {sameRoundMatches.map((match) => {
              const matchVenue = venues[match.venueId];
              return (
                <div
                  key={match.id}
                  className={`text-sm border-l-2 pl-2 ${
                    match.id === nextMatch.id
                      ? "border-nadeshiko"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-gray-600">
                    {match.date} ({getDayOfWeek(match.date)}) {match.time}
                  </div>
                  <div className="font-medium">{match.team1}</div>
                  <div className="text-xs text-nadeshiko">VS</div>
                  <div className="font-medium">{match.team2}</div>
                  <div className="text-xs text-gray-500">
                    {matchVenue.name_jp}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveMatchList = () => {
  const getUpcomingMatch = () => {
    const now = new Date();
    const upcomingMatches = Object.values(matches)
      .filter((match) => {
        if (match.status === "finished") return false;
        return getMatchDateTime(match) > now;
      })
      .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

    return upcomingMatches[0];
  };

  const nextMatch = getUpcomingMatch();
  const [selectedRound, setSelectedRound] = useState(
    nextMatch ? nextMatch.round : "1"
  );
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const getRoundMatches = (round) => {
    return Object.values(matches).filter((match) => {
      if (round === "all") return true;
      return match.round.toString() === round.toString();
    });
  };

  const roundMatches = getRoundMatches(selectedRound);

  const rounds = [
    { value: "1", label: "１回戦" },
    { value: "2", label: "２回戦" },
    { value: "3", label: "３回戦" },
    { value: "4", label: "４回戦" },
    { value: "5", label: "５回戦" },
    { value: "準決勝", label: "準決勝" },
    { value: "決勝", label: "決　勝" },
    { value: "all", label: "全試合" },
  ];

  return (
    <div className="space-y-6">
      {nextMatch && (
        <NextMatchSection nextMatch={nextMatch} roundMatches={roundMatches} />
      )}

      <div className="flex flex-wrap gap-4 justify-center">
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

      <div className="text-center text-sm text-gray-600">
        {selectedRound === "all"
          ? "全試合"
          : selectedRound === "準決勝" || selectedRound === "決勝"
          ? selectedRound
          : `${selectedRound} 回戦`}
        ：{roundMatches.length} 試合
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roundMatches
          .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b))
          .map((match) => {
            const venue = venues[match.venueId];
            return (
              <div
                key={match.id}
                className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                  hoveredMatch === match.id
                    ? "border-pink-600"
                    : "hover:border-pink-600"
                } ${match.status === "finished" ? "opacity-75" : ""}`}
                onMouseEnter={() => setHoveredMatch(match.id)}
                onMouseLeave={() => setHoveredMatch(null)}
                onClick={() => setSelectedMatch(match)}
              >
                <div className="font-bold text-nadeshiko mb-2">
                  {match.date} ({getDayOfWeek(match.date)}) {match.time}
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

      <MatchModal
        isOpen={selectedMatch !== null}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
        venue={selectedMatch ? venues[selectedMatch.venueId] : null}
        teams={teams}
      />
    </div>
  );
};

export default InteractiveMatchList;
