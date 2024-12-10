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
  if (!match) return "";

  const title = [];

  // WE League matches
  if (match.competition === "WEリーグ" || match.type === "SOMPO WEリーグ") {
    title.push("WEリーグ");

    if (match.type === "クラシエカップ") {
      title.push(match.round || "");
    } else {
      // Try to get section from both places
      const section =
        match.section ||
        (match.id && match.id.startsWith("M") ? match.id.slice(1) : null);
      if (section) {
        title.push(`第 ${section} 節`);
      }
    }
  }
  // Other tournaments
  else if (match.competition) {
    title.push(match.competition);
    if (match.round) {
      if (["準々決勝", "準決勝", "決勝"].includes(match.round)) {
        title.push(match.round);
      } else {
        title.push(
          match.round.includes("回戦") ? match.round : `${match.round}回戦`
        );
      }
    }
  }

  return title.filter(Boolean).join(" ").trim();
};

const MatchModal = ({ isOpen, onClose, match, venue, teams }) => {
  if (!isOpen || !match || !venue) return null;

  const matches = match.allMatches || [match];
  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    venue.name_jp
  )}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-auto relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div>
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-bold text-nadeshiko hover:text-nadeshiko-light"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {venue.name_jp}
            </a>
          </div>

          <div className="divide-y">
            {matches.map((match, index) => {
              const team1Data = teams[match.team1];
              const team2Data = teams[match.team2];

              return (
                <div key={match.id} className={index > 0 ? "pt-6" : ""}>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
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
