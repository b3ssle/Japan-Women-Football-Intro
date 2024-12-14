import React from "react";
import { MapPin } from "lucide-react";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const year = parseInt(month) >= 11 ? 2024 : 2025;
  const date = new Date(year, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

const formatMatchTitle = (match) => {
  // For WE League matches
  if (match.type === "SOMPO WEリーグ") {
    return `WEリーグ ${match.section ? `第 ${match.section} 節` : ""}`;
  }

  // For Classie Cup matches
  if (match.type === "クラシエカップ") {
    return `クラシエカップ ${match.round || ""}`;
  }

  // For competition-specific titles
  if (match.competition) {
    // Special handling for specific competitions
    switch (match.competition) {
      case "皇后杯":
        return match.round ? `皇后杯 ${match.round}` : "皇后杯";
      case "高円宮妃杯 U-15":
        return match.round
          ? `高円宮妃杯 U-15 ${match.round}`
          : "高円宮妃杯 U-15";
      case "U-18 女子選手権":
        return match.round
          ? `U-18 女子選手権 ${match.round}`
          : "U-18 女子選手権";
      case "大学女子選手権":
        return match.round ? `大学女子選手権 ${match.round}` : "大学女子選手権";
      case "高校女子選手権":
        return match.round ? `高校女子選手権 ${match.round}` : "高校女子選手権";
    }
  }

  // For tournament rounds
  if (match.round) {
    if (["準々決勝", "準決勝", "決勝"].includes(match.round)) {
      return match.round;
    }
    return `${match.round} 回戦`;
  }

  return match.competition || "";
};

const MatchModal = ({ isOpen, onClose, match, venue, teams }) => {
  if (!isOpen || !match || !venue) return null;

  const matches = match.allMatches || [match];
  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    venue.name_jp
  )}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-auto relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="pr-12">
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start max-w-[calc(100%-40px)] text-lg font-bold text-nadeshiko hover:text-nadeshiko-light"
            >
              <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
              <span className="break-words">{venue.name_jp}</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="閉じる"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="divide-y">
            {matches.map((match, index) => {
              const team1Data = teams[match.team1];
              const team2Data = teams[match.team2];

              return (
                <div key={match.id} className={index > 0 ? "pt-6" : ""}>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="font-bold text-lg">
                        {formatMatchTitle(match)}
                      </div>
                      {match.matchinfo && (
                        <a
                          href={match.matchinfo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm border border-nadeshiko text-nadeshiko px-2 py-1 rounded hover:bg-pink-50"
                        >
                          試合情報
                        </a>
                      )}
                    </div>

                    <div className="text-xl font-bold text-nadeshiko">
                      {match.date} ({getDayOfWeek(match.date)}) {match.time}
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-gray-50 p-4 rounded-lg">
                      <TeamInfo
                        team={team1Data}
                        teamName={match.team1}
                        align="left"
                      />
                      <div className="text-2xl font-bold text-nadeshiko">
                        {match.status === "finished" ? match.score : "VS"}
                      </div>
                      <TeamInfo
                        team={team2Data}
                        teamName={match.team2}
                        align="right"
                      />
                    </div>
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

const TeamInfo = ({ team, teamName, align }) => (
  <div className={`space-y-2 ${align === "right" ? "text-right" : ""}`}>
    <div className="text-lg font-bold">{teamName}</div>
    <div className="text-sm text-gray-600">{team?.region}</div>
    <div className="text-sm text-gray-600">
      {team?.category || team?.homeStadium}
    </div>
    {team?.website && (
      <a
        href={team.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-nadeshiko hover:underline"
      >
        {team?.category === "WEリーグ" ? "クラブ公式サイト" : "紹介サイト"}
      </a>
    )}
  </div>
);

export default MatchModal;
