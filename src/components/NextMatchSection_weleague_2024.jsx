import React from "react";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const date = new Date(2024, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

const getMatchDateTime = (match) => {
  const [month, day] = match.date.split("/").map(Number);
  const [hours, minutes] = match.time.split(":").map(Number);
  const matchDate = new Date(2024, month - 1, day);
  matchDate.setHours(hours, minutes, 0, 0);
  return matchDate;
};

const NextMatchSection_weleague_2024 = ({
  nextMatch,
  venues,
  matches,
  type,
}) => {
  const venue = venues[nextMatch.venueId];

  const sameTypeMatches = Object.values(matches)
    .filter(
      (match) =>
        match.type === type &&
        match.status !== "finished" &&
        (type === "SOMPO WEリーグ"
          ? match.section === nextMatch.section
          : match.round === nextMatch.round)
    )
    .filter((match) => getMatchDateTime(match) >= new Date())
    .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b));

  return (
    <div className="bg-gradient-to-r from-pink-100/50 to-pink-50/50 rounded-2xl p-8 mb-12">
      {" "}
      <h2 className="text-2xl font-bold mb-8 flex items-center justify-start">
        <span className="w-2 h-8 bg-pink-600 mr-3"></span>
        次の試合：
        {type === "SOMPO WEリーグ"
          ? `第 ${nextMatch.section} 節`
          : nextMatch.round}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* 次の試合 */}
        <div className="text-left space-y-2">
          <div className="text-3xl font-bold">
            {nextMatch.date} ({getDayOfWeek(nextMatch.date)}) {nextMatch.time}
          </div>
          {nextMatch.status === "finished" ? (
            <>
              <div className="text-lg font-bold">{nextMatch.team1}</div>
              <div className="text-xl font-bold text-pink-600">
                {nextMatch.score}
              </div>
              <div className="text-lg font-bold">{nextMatch.team2}</div>
            </>
          ) : (
            <>
              <div className="text-lg font-bold">{nextMatch.team1}</div>
              <div className="text-xl font-bold text-pink-600">VS</div>
              <div className="text-lg font-bold">{nextMatch.team2}</div>
            </>
          )}
          <div className="mt-4">
            <div className="font-bold text-lg">会場</div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-pink-600"
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

        {/* 同じ節・同じ大会の試合一覧 */}
        <div className="col-span-2 space-y-2">
          <div className="font-bold text-lg mb-4">
            {type === "SOMPO WEリーグ"
              ? `第 ${nextMatch.section} 節の試合一覧`
              : `${nextMatch.round}の試合一覧`}
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {sameTypeMatches.map((match) => {
              const matchVenue = venues[match.venueId];
              return (
                <div
                  key={match.id}
                  className={`text-sm border-l-2 pl-2 ${
                    match.id === nextMatch.id
                      ? "border-pink-600"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-gray-600">
                    {match.date} ({getDayOfWeek(match.date)}) {match.time}
                  </div>
                  <div className="font-medium">{match.team1}</div>
                  <div className="text-xs text-pink-600">VS</div>
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

export default NextMatchSection_weleague_2024;
