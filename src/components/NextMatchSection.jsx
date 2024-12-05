import React from "react";
import { MapPin } from "lucide-react";

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
  matchDate.setHours(hours || 0, minutes || 0, 0, 0);
  return matchDate;
};

const NextMatchSection = ({
  nextMatch,
  matches,
  venues,
  displayType,
  onMatchClick,
}) => {
  if (!nextMatch) return null;

  const venue = venues[nextMatch.venueId];

  const formatTitle = () => {
    if (nextMatch.round && !nextMatch.type) {
      if (nextMatch.round === "準決勝" || nextMatch.round === "決勝") {
        return nextMatch.round;
      }
      return `${nextMatch.round} 回戦`;
    }
    if (nextMatch.type === "SOMPO WEリーグ") {
      return `第 ${nextMatch.section} 節`;
    }
    if (nextMatch.type === "クラシエカップ") {
      return `クラシエカップ ${nextMatch.round}`;
    }

    return "";
  };

  const getSameTypeMatches = () => {
    return Object.values(matches)
      .filter((match) => {
        if (match.status === "finished") return false;
        if (match.round) {
          return match.round === nextMatch.round;
        }
        if (nextMatch.type === "SOMPO WEリーグ") {
          return (
            match.type === nextMatch.type && match.section === nextMatch.section
          );
        }
        if (nextMatch.type === "クラシエカップ") {
          return (
            match.type === nextMatch.type && match.round === nextMatch.round
          );
        }

        return false;
      })
      .filter((match) => getMatchDateTime(match) >= new Date())
      .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));
  };

  const sameTypeMatches = getSameTypeMatches();

  return (
    <div className="bg-gradient-to-r from-pink-100/50 to-pink-50/50 rounded-2xl p-8 mb-12">
      <h2 className="text-2xl font-bold mb-8 flex items-center justify-start">
        <span className="w-2 h-8 bg-pink-600 mr-3"></span>
        次の試合：{formatTitle()}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 下一場比賽資訊 */}
        <div className="text-left space-y-2">
          <div className="text-3xl font-bold">
            {nextMatch.date} ({getDayOfWeek(nextMatch.date)}) {nextMatch.time}
          </div>
          <div className="text-lg font-bold">{nextMatch.team1}</div>
          <div className="text-xl font-bold text-nadeshiko">VS</div>
          <div className="text-lg font-bold">{nextMatch.team2}</div>

          <div className="mt-4">
            <div className="font-bold text-lg">会場</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-nadeshiko" />
              <div>
                <div className="text-lg">{venue.name_jp}</div>
                <div className="text-sm text-gray-600">{venue.region}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 同類型比賽列表 */}
        <div className="col-span-2 space-y-2">
          <div className="font-bold text-lg mb-4">
            {formatTitle()}の試合一覧
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {sameTypeMatches.map((match) => {
              const matchVenue = venues[match.venueId];
              return (
                <div
                  key={match.id}
                  className={`text-sm border-l-2 pl-2 cursor-pointer ${
                    match.id === nextMatch.id
                      ? "border-pink-600"
                      : "border-gray-200"
                  }`}
                  onClick={() => onMatchClick?.(match)}
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

export default NextMatchSection;
