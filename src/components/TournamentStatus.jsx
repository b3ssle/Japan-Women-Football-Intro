import React from "react";

const TournamentStatus = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-6">
      <h2 className="text-2xl font-bold mb-6">大会進行状況</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-nadeshiko mb-2">WEリーグ</h3>
          <p className="text-gray-800 leading-relaxed">
            WEリーグのリーグ戦は冬季休暇に入り、2025 年 3 月から第 12
            節が再開します。
            先日行われたクラシエカップ準決勝では、サンフレッチェ広島レジーナと
            INAC 神戸レオネッサが勝利を収め、 12 月 29
            日の国立競技場での決勝戦で激突します。
            <a
              href="https://weleague.jp/kraciecup/2024-25/"
              className="inline-block border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              決勝戦情報
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-bold text-nadeshiko mb-2">皇后杯</h3>
          <p className="text-gray-800 leading-relaxed">
            皇后杯は準々決勝が終了し、日テレ・東京ベレーザ、アルビレックス新潟レディース、三菱重工浦和レッズレディース、そして
            INAC 神戸レオネッサが準決勝進出を決めました。 2025 年 1 月 18
            日のサンガスタジアムでの準決勝、そして 1 月 25
            日のエディオンピースウイング広島での決勝戦へ向けて、ベスト４による頂点決定戦が今後展開されます。
          </p>
        </div>

        <div>
          <h3 className="font-bold text-nadeshiko mb-2">年末年始の大会</h3>
          <p className="text-gray-800 leading-relaxed">
            12 月 24 日からは全日本大学女子選手権が開幕し、全国から 23
            チームが集まり優勝を目指します。 続いて 12 月 29
            日からは全日本高校女子選手権も始まり、48
            の代表校による熱戦が繰り広げられます。 両大会とも 2025 年 1
            月に決勝を迎え、それぞれの新チャンピオンが決定します。
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentStatus;
