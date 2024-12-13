import React, { useState } from "react";
import { teams } from "../data/Joshi_Youth_U15_2024_teams";

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const YouthU15Teams2024 = () => {
  const [selectedRegion, setSelectedRegion] = useState("全部");
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null);

  const regions = [
    "全部",
    "北海道",
    "東北",
    "関東",
    "北信越",
    "東海",
    "関西",
    "中国",
    "四国",
    "九州",
  ];

  const getRegionForTeam = (team) => {
    if (team.category.includes("東北")) return "東北";
    if (team.category.includes("関東")) return "関東";
    if (team.category.includes("北信越")) return "北信越";
    if (team.category.includes("東海")) return "東海";
    if (team.category.includes("関西")) return "関西";
    if (team.category.includes("中国")) return "中国";
    if (team.category.includes("四国")) return "四国";
    if (team.category.includes("九州")) return "九州";
    if (team.category.includes("北海道")) return "北海道";

    for (const region of regions) {
      if (team.region.includes(region)) return region;
    }

    return "その他";
  };

  const filteredTeams = Object.values(teams).filter(
    (team) =>
      selectedRegion === "全部" || getRegionForTeam(team) === selectedRegion
  );

  const regionColorMap = {
    北海道: "bg-blue-100",
    東北: "bg-green-100",
    関東: "bg-yellow-100",
    北信越: "bg-orange-100",
    東海: "bg-red-100",
    関西: "bg-purple-100",
    中国: "bg-pink-100",
    四国: "bg-indigo-100",
    九州: "bg-teal-100",
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              JFA 第 28 回全日本 U-15 女子サッカー選手権大会チーム紹介
            </h1>
            <div className="text-sm text-gray-500">
              全 {filteredTeams.length} チーム
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedRegion === region
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {region}
                <span className="ml-1 text-sm">
                  (
                  {region === "全部"
                    ? Object.values(teams).length
                    : Object.values(teams).filter(
                        (team) => getRegionForTeam(team) === region
                      ).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map((team) => (
            <div
              key={team.name}
              className={`border rounded-lg p-4 transition-all ${
                hoveredTeam === team.name
                  ? "border-pink-500 shadow-lg"
                  : "hover:border-pink-500"
              }`}
              onMouseEnter={() => setHoveredTeam(team.name)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{team.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    regionColorMap[getRegionForTeam(team)] || "bg-gray-100"
                  }`}
                >
                  {team.category}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-nadeshiko">
                    <MapPinIcon />
                  </span>
                  <span>{team.region}</span>
                </div>
                {team.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-nadeshiko">
                      <LinkIcon />
                    </span>
                    <a
                      href={team.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nadeshiko hover:underline"
                    >
                      紹介サイト
                    </a>
                  </div>
                )}
                <div className="relative">
                  <p
                    className={`text-sm text-gray-600 ${
                      expandedTeam === team.name ? "" : "line-clamp-3"
                    }`}
                  >
                    {team.introduction}
                  </p>
                  {team.introduction.length > 100 && (
                    <button
                      onClick={() =>
                        setExpandedTeam(
                          expandedTeam === team.name ? null : team.name
                        )
                      }
                      className="text-nadeshiko text-sm hover:underline mt-1"
                    >
                      {expandedTeam === team.name ? "閉じる ▲" : "もっと見る ▼"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouthU15Teams2024;