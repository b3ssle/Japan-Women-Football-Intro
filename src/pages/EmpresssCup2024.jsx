import React from "react";
import InteractiveMap from "../components/interactiveMap_empressscup_2024";

function EmpresssCup2024() {
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Tournament Title */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          皇后杯 JFA 第 46 回全日本女子サッカー選手権大会
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-600 mb-2">
            2024 年 11 月 17 日 - 2025 年 1 月 25 日
          </p>
          <a
            href="https://www.jfa.jp/match/empressscup_2024/"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            大会情報
          </a>
          <a
            href="/empressscup_2024_teams"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            チーム紹介
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">更新日時：{lastUpdateTime}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            公益財団法人日本サッカー協会は、日本国内における女子のサッカー技術の向上と健全な心身の育成を図り、広く女子サッカーの普及振興に寄与することを目的とし、中学１年生以上の登録選手を対象とした国内で最も権威のある単独チームの大会として実施する。
          </p>
          <p className="text-sm text-gray-500">
            出典：
            <a
              href="https://www.jfa.jp/match/empressscup_2017/about.html"
              className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              JFA.jp
            </a>
          </p>
        </div>
      </section>

      {/* Interactive Map Component */}
      <InteractiveMap />
    </main>
  );
}

export default EmpresssCup2024;
