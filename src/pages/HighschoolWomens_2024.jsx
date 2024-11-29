import React from "react";

function HighschoolWomens2024() {
  const lastUpdateTime =
    import.meta.env.VITE_LAST_UPDATE_TIME || "更新時間取得中...";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Tournament Title */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          第 33 回全日本高等学校女子サッカー選手権大会
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-600 mb-2">
            2024 年 12 月 29 日 - 2025 年 1 月 12 日
          </p>
          <a
            href="https://www.jfa.jp/match/highschool_womens_2024/"
            className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            大会情報
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">更新日時：{lastUpdateTime}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            全日本高等学校女子サッカー選手権大会は日本サッカー協会（JFA）が主催し、高校女子サッカー部の頂点を決める大会。
          </p>
          <p className="text-sm text-gray-500">
            出典：
            <a
              href="https://olympics.com/ja/news/%E5%85%A8%E6%97%A5%E6%9C%AC%E9%AB%98%E6%A0%A1%E5%A5%B3%E5%AD%90%E3%82%B5%E3%83%83%E3%82%AB-%E9%81%B8%E6%89%8B%E6%A8%A9%E3%81%AE%E6%97%A5%E7%A8%8B-%E6%94%BE%E9%80%81%E4%BA%88%E5%AE%9A"
              className="text-nadeshiko hover:text-nadeshiko-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Olympics.com/ja/
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default HighschoolWomens2024;
