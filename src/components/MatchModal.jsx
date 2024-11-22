import React from 'react';

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

  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(venue.name_jp)}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="font-bold text-lg">
              {match.round === "準決勝" || match.round === "決勝"
                ? match.round
                : `第 ${match.round} 回戦`}
            </div>
            <a
              href={match.matchinfo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-pink-600 text-pink-600 px-2 py-1 rounded hover:bg-pink-50"
            >
              試合情報
            </a>
          </div>

          <div className="text-xl font-bold text-pink-600">
            {match.date} ({getDayOfWeek(match.date)}) {match.time}
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-pink-600 hover:text-pink-700"
            >
              <svg
                className="w-4 h-4 mr-1"
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
              {venue.name_jp}
            </a>
          </div>

          <div className="flex justify-between items-center">
            <a
              href={team1Data?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-pink-600 hover:text-pink-700"
            >
              {match.team1}
            </a>
            <div className="text-xl font-bold">VS</div>
            <a
              href={team2Data?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-pink-600 hover:text-pink-700"
            >
              {match.team2}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="text-sm text-gray-600 space-y-2">
              <div>{team1Data?.introduction}</div>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div>{team2Data?.introduction}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;