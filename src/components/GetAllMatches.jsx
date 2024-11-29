import React from "react";
import { matches as empressMatches } from "../data/empressscup_2024_matches";
import { matches as weleagueMatches } from "../data/weleague_2024_matches";
import { matches as universityMatches } from "../data/universitywomens_2024_matches";
import { matches as highschoolMatches } from "../data/highschoolwomens_2024_matches";
import { venues as empressVenues } from "../data/empressscup_2024_venues";
import { venues as weleagueVenues } from "../data/weleague_2024_venues";
import { venues as universityVenues } from "../data/universitywomens_2024_venues";
import { venues as highschoolVenues } from "../data/highschoolwomens_2024_venues";

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
    round: match.round || match.section,
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
  return new Date(
    2024,
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