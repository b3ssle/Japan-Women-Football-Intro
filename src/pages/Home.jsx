import React, { useState } from "react";
import { teams } from "../data/empressscup_2024_teams";

const coordinates = {
  // 關東
  omiya: { x: 500, y: 425 }, // 大宮
  urawa: { x: 515, y: 445 }, // 浦和
  chifure: { x: 490, y: 405 }, // 熊谷
  beleza: { x: 470, y: 460 }, // 東京
  stellas: { x: 450, y: 480 }, // 神奈川
  jef: { x: 530, y: 450 }, // 千葉

  // 其他地區
  albirex: { x: 445, y: 380 }, // 新潟
  sendai: { x: 510, y: 350 }, // 仙台
  parceiro: { x: 420, y: 400 }, // 長野
  hiroshima: { x: 380, y: 480 }, // 廣島
  inac: { x: 410, y: 500 }, // 神戶
  cerezo: { x: 395, y: 490 }, // 大阪
};

function Home() {
  const weLeagueTeams = Object.values(teams).filter(
    (team) => team.category === "WEリーグ"
  );
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const getTextPosition = (x) => {
    return x > 450 ? "start" : "end";
  };

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
        <p className="text-xl text-gray-600 mb-8">
          日本女子サッカーの世界を探索する！
        </p>

        <div className="flex flex-col gap-8">
          <svg
            viewBox="0 0 800 800"
            className="w-full max-w-2xl mx-auto"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          >
            {/* 北海道 - 正方形 */}
            <rect
              x="480"
              y="120"
              width="120"
              height="120"
              rx="20"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
            />

            {/* 本州 - 長方形 */}
            <rect
              x="300"
              y="280"
              width="380"
              height="280"
              rx="20"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
            />

            {/* 九州 */}
            <rect
              x="100"
              y="580"
              width="100"
              height="100"
              rx="20"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
            />

            {/* 四國 */}
            <rect
              x="240"
              y="580"
              width="120"
              height="100"
              rx="20"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
            />

            {/* 沖縄 */}
            <rect
              x="80"
              y="720"
              width="60"
              height="60"
              rx="15"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all"
            />

            {/* 球隊位置和文字 */}
            <g className="cities">
              {weLeagueTeams.map((team) => (
                <g key={team.id}>
                  {hoveredTeam === team.id && (
                    <text
                      x={
                        coordinates[team.id].x +
                        (getTextPosition(coordinates[team.id].x) === "start"
                          ? 15
                          : -15)
                      }
                      y={coordinates[team.id].y + 5}
                      className="text-base font-medium fill-gray-700 pointer-events-none"
                      textAnchor={getTextPosition(coordinates[team.id].x)}
                      dominantBaseline="middle"
                    >
                      {team.name}
                    </text>
                  )}
                  <circle
                    cx={coordinates[team.id].x}
                    cy={coordinates[team.id].y}
                    r="8"
                    className={`${
                      hoveredTeam === team.id
                        ? "fill-nadeshiko-dark"
                        : "fill-nadeshiko"
                    } transition-all cursor-pointer`}
                    onMouseEnter={() => setHoveredTeam(team.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  />
                </g>
              ))}
            </g>
          </svg>

          {/* 球隊列表 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {weLeagueTeams.slice(0, 6).map((team) => (
                <div
                  key={team.id}
                  className={`border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
                    hoveredTeam === team.id
                      ? "border-nadeshiko bg-nadeshiko/5"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredTeam(team.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                >
                  <h3 className="font-bold text-base">
                    <a
                      href={team.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-nadeshiko transition-colors"
                    >
                      {team.name}
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {team.homeStadium}, {team.region}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {weLeagueTeams.slice(6).map((team) => (
                <div
                  key={team.id}
                  className={`border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
                    hoveredTeam === team.id
                      ? "border-nadeshiko bg-nadeshiko/5"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredTeam(team.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                >
                  <h3 className="font-bold text-base">
                    <a
                      href={team.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-nadeshiko transition-colors"
                    >
                      {team.name}
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {team.homeStadium}, {team.region}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
