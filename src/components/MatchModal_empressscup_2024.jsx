import React from "react";
import { MapPin } from "lucide-react";

const getDayOfWeek = (dateStr) => {
  const [month, day] = dateStr.split("/").map(Number);
  const date = new Date(2024, month - 1, day);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

const MatchModal = ({ isOpen, onClose, match, venue, teams }) => {
  if (!isOpen || !match || !venue) return null;

  const team1Data = teams[match.team1];
  const team2Data = teams[match.team2];
  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    venue.name_jp
  )}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="space-y-6">
          {/* 場地資訊 */}
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

          <div className="space-y-4">
            {/* 比賽資訊 */}
            <div className="flex items-center gap-3">
              <div className="font-bold text-lg">
                {match.competition}
                {match.round === "準決勝" || match.round === "決勝"
                  ? ` ${match.round}`
                  : ` ${match.round} 回戦`}
              </div>
              <a
                href={match.matchinfo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-nadeshiko text-nadeshiko px-2 py-1 rounded hover:bg-pink-50"
              >
                試合情報
              </a>
            </div>

            {/* 比賽時間 */}
            <div className="text-xl font-bold text-nadeshiko">
              {match.date} ({getDayOfWeek(match.date)}) {match.time}
            </div>

            {/* 對陣資訊 */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="text-lg font-bold">{match.team1}</div>
                <div className="text-sm text-gray-600">
                  {team1Data?.region}
                </div>
                <div className="text-sm text-gray-600">
                  {team1Data?.category}
                </div>
                {team1Data?.website && (
                  <a
                    href={team1Data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-nadeshiko hover:underline"
                  >
                    紹介サイト
                  </a>
                )}
              </div>

              <div className="text-2xl font-bold text-nadeshiko">VS</div>

              <div className="space-y-2 text-right">
                <div className="text-lg font-bold">{match.team2}</div>
                <div className="text-sm text-gray-600">
                  {team2Data?.region}
                </div>
                <div className="text-sm text-gray-600">
                  {team2Data?.category}
                </div>
                {team2Data?.website && (
                  <a
                    href={team2Data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-nadeshiko hover:underline"
                  >
                    紹介サイト
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;