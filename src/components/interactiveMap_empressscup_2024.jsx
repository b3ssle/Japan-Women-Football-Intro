import React, { useState } from "react";
import { matches } from "../data/empressscup_2024_matches";
import { venues } from "../data/empressscup_2024_venues";
import { teams } from "../data/empressscup_2024_teams";
import MatchModal from "./MatchModal_empressscup_2024";

// 工具函數
const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const date = new Date(2024, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

// 轉換日期和時間到 Date 物件的函數
const getMatchDateTime = (match) => {
  const [month, day] = match.date.split("/").map(Number);
  const [hours, minutes] = match.time.split(":").map(Number);
  const matchDate = new Date(2024, month - 1, day);
  matchDate.setHours(hours, minutes, 0, 0);
  return matchDate;
};

// NextMatchSection 組件
const NextMatchSection = ({ nextMatch, roundMatches }) => {
  // 獲取所有該輪次的比賽並正確排序
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

        {/* 同じ回戦の試合一覧 */}
        <div className="col-span-2 space-y-2">
          <div className="font-bold text-lg mb-4">
            {nextMatch.round === "準決勝" || nextMatch.round === "決勝"
              ? `${nextMatch.round}の試合一覧`
              : `${nextMatch.round} 回戦の試合一覧`}
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {sameRoundMatches
              .filter((match) => {
                if (match.status === "finished") return false;
                const matchDate = new Date(
                  2024,
                  parseInt(match.date.split("/")[0]) - 1,
                  parseInt(match.date.split("/")[1])
                );
                matchDate.setHours(...match.time.split(":").map(Number));
                return matchDate >= new Date();
              })
              .sort((a, b) => {
                const dateA = new Date(
                  2024,
                  parseInt(a.date.split("/")[0]) - 1,
                  parseInt(a.date.split("/")[1])
                );
                const dateB = new Date(
                  2024,
                  parseInt(b.date.split("/")[0]) - 1,
                  parseInt(b.date.split("/")[1])
                );
                return dateA - dateB;
              })
              .map((match) => {
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

const InteractiveMap = () => {
  // getUpcomingMatch 函數使用日期與時間一起比較的邏輯
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
  const [hoveredVenue, setHoveredVenue] = useState(null);
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

      {/* 輪次選擇按鈕 */}
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

      {/* 選擇的輪次和比賽數量 */}
      <div className="text-center text-sm text-gray-600">
        {selectedRound === "all"
          ? "全試合"
          : selectedRound === "準決勝" || selectedRound === "決勝"
          ? selectedRound
          : `${selectedRound} 回戦`}
        ：{roundMatches.length} 試合
      </div>

      {/* 地圖部分 */}
      <div className="relative bg-white rounded-lg shadow-lg p-4">
        <div className="w-full">
          {/* 小螢幕版本 */}
          <div className="block md:hidden">
            <svg
              viewBox="0 0 600 600"
              className="w-full"
              style={{ minHeight: "350px", maxHeight: "450px" }}
            >
              <g className="japan-map" transform="translate(100, 50)">
                {/* 北海道 */}
                <path
                  d="M350 50 L400 80 L420 120 L390 150 L340 140 L320 100 L330 70 Z"
                  className="fill-gray-100 stroke-gray-300"
                />
                {/* 本州 */}
                <path
                  d="M300 140 L320 160 L350 180 L380 220 L350 260 L300 300 L250 320 L200 310 L180 280 L160 240 L180 200 L220 180 L260 170 Z"
                  className="fill-gray-100 stroke-gray-300"
                />
                {/* 四国 */}
                <path
                  d="M180 300 L220 290 L240 310 L220 330 L190 330 L170 320 Z"
                  className="fill-gray-100 stroke-gray-300"
                />
                {/* 九州 */}
                <path
                  d="M120 280 L150 270 L170 290 L160 330 L130 350 L100 330 L90 300 Z"
                  className="fill-gray-100 stroke-gray-300"
                />
              </g>

              {/* 場地標記 - 根據新的地圖位置調整 */}
              <g className="venue-markers">
                {roundMatches.map((match) => {
                  const venue = venues[match.venueId];
                  if (!venue?.coordinates) return null;

                  // 調整座標以匹配新的地圖位置
                  const adjustedX = venue.coordinates.x * 1.0 + 100; // 加上與地圖相同的 translate x
                  const adjustedY = venue.coordinates.y * 1.0 + 50; // 加上與地圖相同的 translate y

                  return (
                    <g key={`marker-${match.id}`}>
                      <circle
                        cx={adjustedX}
                        cy={adjustedY}
                        r="8"
                        className={`fill-nadeshiko transition-colors ${
                          match.status === "finished" ? "opacity-50" : ""
                        }`}
                      />
                      <text
                        x={adjustedX + 12}
                        y={adjustedY + 5}
                        className="text-base fill-current pointer-events-none"
                      >
                        {venue.short}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* 互動層和資訊框也需要調整 */}
              <g className="interaction-layer" style={{ pointerEvents: "all" }}>
                {roundMatches.map((match) => {
                  const venue = venues[match.venueId];
                  if (!venue?.coordinates) return null;

                  const adjustedX = venue.coordinates.x * 1.0 + 100;
                  const adjustedY = venue.coordinates.y * 1.0 + 50;
                  const isHovered = hoveredVenue === match.id;

                  return (
                    <g key={`interaction-${match.id}`}>
                      <circle
                        cx={adjustedX}
                        cy={adjustedY}
                        r="20"
                        className="fill-transparent cursor-pointer"
                        onMouseEnter={() => setHoveredVenue(match.id)}
                        onMouseLeave={() => setHoveredVenue(null)}
                      />

                      {isHovered && (
                        <>
                          <rect
                            x={adjustedX + 15}
                            y={adjustedY - 50}
                            width="200"
                            height="100"
                            rx="4"
                            className="fill-white stroke-nadeshiko"
                            style={{
                              filter:
                                "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                            }}
                          />
                          <text
                            x={adjustedX + 25}
                            y={adjustedY - 30}
                            className="text-sm fill-current"
                          >
                            <tspan
                              x={adjustedX + 25}
                              dy="0"
                              className="font-bold"
                            >
                              {match.date}({getDayOfWeek(match.date)}){" "}
                              {match.time}
                            </tspan>
                            <tspan
                              x={adjustedX + 25}
                              dy="20"
                              className="font-medium"
                            >
                              {match.team1}
                            </tspan>
                            <tspan
                              x={adjustedX + 25}
                              dy="20"
                              className="font-medium"
                            >
                              {match.status === "finished" ? match.score : "VS"}{" "}
                              {match.team2}
                            </tspan>
                            <tspan
                              x={adjustedX + 25}
                              dy="20"
                              className="text-gray-600"
                            >
                              {venue.name_jp}
                            </tspan>
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* 中螢幕版本 */}
          <div className="hidden md:block lg:hidden">
            <svg
              viewBox="0 0 800 600"
              className="w-full"
              style={{ minHeight: "400px", maxHeight: "500px" }}
            >
              <g transform="translate(50, 50) scale(0.9)">
                {/* 基礎地圖 */}
                <g className="japan-map">
                  <path
                    d="M600 50 L650 80 L670 120 L640 150 L590 140 L570 100 L580 70 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M500 140 L520 160 L550 180 L580 220 L550 260 L500 300 L450 320 L400 310 L380 280 L360 240 L380 200 L420 180 L460 170 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M380 300 L420 290 L440 310 L420 330 L390 330 L370 320 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M320 280 L350 270 L370 290 L360 330 L330 350 L300 330 L290 300 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                </g>

                {/* 場地標記 */}
                <g className="venue-markers">
                  {roundMatches.map((match) => {
                    const venue = venues[match.venueId];
                    if (!venue?.coordinates) return null;

                    const adjustedX = venue.coordinates.x * 1.4; // 適中的縮放
                    const adjustedY = venue.coordinates.y * 1.1;

                    return (
                      <g key={`marker-${match.id}`}>
                        <circle
                          cx={adjustedX}
                          cy={adjustedY}
                          r="7" // 適中的標記大小
                          className={`fill-nadeshiko transition-colors ${
                            match.status === "finished" ? "opacity-50" : ""
                          }`}
                        />
                        <text
                          x={adjustedX + 12}
                          y={adjustedY + 5}
                          className="text-sm fill-current pointer-events-none" // 適中的文字大小
                        >
                          {venue.short}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* 互動層和資訊框 */}
                <g
                  className="interaction-layer"
                  style={{ pointerEvents: "all" }}
                >
                  {roundMatches.map((match) => {
                    const venue = venues[match.venueId];
                    if (!venue?.coordinates) return null;

                    const adjustedX = venue.coordinates.x * 1.4;
                    const adjustedY = venue.coordinates.y * 1.1;
                    const isHovered = hoveredVenue === match.id;

                    return (
                      <g key={`interaction-${match.id}`}>
                        <circle
                          cx={adjustedX}
                          cy={adjustedY}
                          r="18" // 適中的互動區域
                          className="fill-transparent cursor-pointer"
                          onMouseEnter={() => setHoveredVenue(match.id)}
                          onMouseLeave={() => setHoveredVenue(null)}
                        />

                        {isHovered && (
                          <>
                            <rect
                              x={adjustedX + 15}
                              y={adjustedY - 55}
                              width="240" // 適中的資訊框寬度
                              height="125"
                              rx="6"
                              className="fill-white stroke-nadeshiko"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                              }}
                            />
                            <text
                              x={adjustedX + 25}
                              y={adjustedY - 30}
                              className="text-sm fill-current" // 適中的文字大小
                            >
                              <tspan
                                x={adjustedX + 25}
                                dy="0"
                                className="font-bold"
                              >
                                {match.date}({getDayOfWeek(match.date)}){" "}
                                {match.time}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="25"
                                className="font-medium"
                              >
                                {match.team1}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="25"
                                className="font-medium"
                              >
                                {match.status === "finished"
                                  ? match.score
                                  : "VS"}{" "}
                                {match.team2}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="25"
                                className="text-gray-600"
                              >
                                {venue.name_jp}
                              </tspan>
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
          </div>

          {/* 大螢幕版本 */}
          <div className="hidden lg:block">
            <svg
              viewBox="0 0 1200 600"
              className="w-full"
              style={{ minHeight: "500px", maxHeight: "700px" }}
            >
              <g transform="translate(0, 0) scale(1)">
                {/* 基礎地圖 */}
                <g className="japan-map">
                  {/* 北海道 */}
                  <path
                    d="M700 50 L780 90 L810 140 L770 180 L690 165 L660 110 L675 70 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M600 140 L630 165 L670 190 L710 240 L670 290 L600 340 L530 365 L460 350 L430 310 L400 260 L430 210 L480 185 L530 170 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M430 340 L490 325 L520 350 L490 380 L450 380 L420 365 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                  <path
                    d="M350 310 L390 300 L420 330 L410 380 L370 410 L330 385 L315 345 Z"
                    className="fill-gray-100 stroke-gray-300"
                  />
                </g>

                {/* 場地標記 */}
                <g className="venue-markers">
                  {roundMatches.map((match) => {
                    const venue = venues[match.venueId];
                    if (!venue?.coordinates) return null;

                    const adjustedX = venue.coordinates.x * 1.6;
                    const adjustedY = venue.coordinates.y * 1.2;

                    return (
                      <g key={`marker-${match.id}`}>
                        <circle
                          cx={adjustedX}
                          cy={adjustedY}
                          r="6"
                          className={`fill-nadeshiko transition-colors ${
                            match.status === "finished" ? "opacity-50" : ""
                          }`}
                        />
                        <text
                          x={adjustedX + 12}
                          y={adjustedY + 5}
                          className="text-sm fill-current pointer-events-none"
                        >
                          {venue.short}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* 互動層和資訊框 */}
                <g
                  className="interaction-layer"
                  style={{ pointerEvents: "all" }}
                >
                  {roundMatches.map((match) => {
                    const venue = venues[match.venueId];
                    if (!venue?.coordinates) return null;

                    const adjustedX = venue.coordinates.x * 1.6;
                    const adjustedY = venue.coordinates.y * 1.2;
                    const isHovered = hoveredVenue === match.id;

                    return (
                      <g key={`interaction-${match.id}`}>
                        <circle
                          cx={adjustedX}
                          cy={adjustedY}
                          r="15"
                          className="fill-transparent cursor-pointer"
                          onMouseEnter={() => setHoveredVenue(match.id)}
                          onMouseLeave={() => setHoveredVenue(null)}
                        />

                        {isHovered && (
                          <>
                            <rect
                              x={adjustedX + 15}
                              y={adjustedY - 60}
                              width="280"
                              height="130"
                              rx="6"
                              className="fill-white stroke-nadeshiko"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                              }}
                            />
                            <text
                              x={adjustedX + 25}
                              y={adjustedY - 35}
                              className="text-sm fill-current"
                            >
                              <tspan
                                x={adjustedX + 25}
                                dy="0"
                                className="font-bold"
                              >
                                {match.date}({getDayOfWeek(match.date)}){" "}
                                {match.time}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="28"
                                className="font-medium"
                              >
                                {match.team1}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="28"
                                className="font-medium"
                              >
                                {match.status === "finished"
                                  ? match.score
                                  : "VS"}{" "}
                                {match.team2}
                              </tspan>
                              <tspan
                                x={adjustedX + 25}
                                dy="28"
                                className="text-gray-600"
                              >
                                {venue.name_jp}
                              </tspan>
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 比賽列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roundMatches
          .sort((a, b) => getMatchDateTime(a) - getMatchDateTime(b))
          .map((match) => {
            const venue = venues[match.venueId];
            return (
              <div
                key={match.id}
                className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                  hoveredVenue === match.id
                    ? "border-pink-600"
                    : "hover:border-pink-600"
                } ${match.status === "finished" ? "opacity-75" : ""}`}
                onMouseEnter={() => setHoveredVenue(match.id)}
                onMouseLeave={() => setHoveredVenue(null)}
                onClick={() => setSelectedMatch(match)}
              >
                <div className="font-bold text-pink-600 mb-2">
                  {match.date} ({getDayOfWeek(match.date)}) {match.time}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{match.team1}</div>
                    <div className="text-sm text-pink-600 mx-2">
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

      {/* Modal */}
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

export default InteractiveMap;
