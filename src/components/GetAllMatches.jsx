import React from "react";
import { matches as empressMatches } from "../data/empressscup_2024_matches";
import { matches as weleagueMatches } from "../data/weleague_2024_matches";
import { matches as universityMatches } from "../data/universitywomens_2024_matches";
import { matches as highschoolMatches } from "../data/highschoolwomens_2024_matches";
import { matches as joshiYouthMatches } from "../data/Joshi_Youth_U15_2024_matches";
import { venues as empressVenues } from "../data/empressscup_2024_venues";
import { venues as weleagueVenues } from "../data/weleague_2024_venues";
import { venues as universityVenues } from "../data/universitywomens_2024_venues";
import { venues as highschoolVenues } from "../data/highschoolwomens_2024_venues";
import { venues as joshiYouthVenues } from "../data/Joshi_Youth_U15_2024_venues";

const formatRound = (match, competition) => {
  if (competition === "WEリーグ") {
    if (match.type === "クラシエカップ") {
      return `クラシエカップ ${match.round}`;
    }
    if (match.type === "SOMPO WEリーグ") {
      return `第 ${match.section} 節`;
    }
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

const normalizeMatch = (match, competition, venues) => {
  
  return {
    id: match.id,
    competition,
    date: match.date,
    time: match.time,
    venue: venues[match.venueId],
    team1: match.team1,
    team2: match.team2,
    status: match.status,
    score: match.score,
    round: formatRound(match, competition),
    type: match.type,
    matchinfo: match.matchinfo,
  };
};

const getWeekRange = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay() + 7);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

const parseMatchDate = (match) => {
  const [month, day] = match.date.split("/");
  const [hours, minutes] =
    match.time === "未定" ? [0, 0] : match.time.split(":");
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  return new Date(
    year,
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours) || 0,
    parseInt(minutes) || 0
  );
};

export const getCurrentWeekMatches = () => {
  const { monday, sunday } = getWeekRange();

  const allMatches = [
    ...Object.values(empressMatches).map((m) =>
      normalizeMatch(m, "皇后杯", empressVenues)
    ),
    ...Object.values(weleagueMatches).map((m) =>
      normalizeMatch(m, "WEリーグ", weleagueVenues)
    ),
    ...Object.values(joshiYouthMatches).map((m) =>
      normalizeMatch(m, "高円宮妃杯 U15", joshiYouthVenues)
    ),
    ...Object.values(universityMatches).map((m) =>
      normalizeMatch(m, "全日本大学女子サッカー選手権", universityVenues)
    ),
    ...Object.values(highschoolMatches).map((m) =>
      normalizeMatch(m, "全日本高校女子サッカー選手権", highschoolVenues)
    ),
  ];

  return allMatches
    .filter((match) => {
      const matchDate = parseMatchDate(match);
      return matchDate >= monday && matchDate <= sunday;
    })
    .sort((a, b) => parseMatchDate(a) - parseMatchDate(b));
};

export default getCurrentWeekMatches;
