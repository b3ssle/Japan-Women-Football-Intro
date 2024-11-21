import React from "react";

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-6xl font-bold mb-4">日本女子サッカーマップ</h1>
          <p className="text-xl text-gray-600">
            日本女子サッカーの世界を探索する！
          </p>
        </div>
        <div className="md:w-1/2">
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-lg mx-auto"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          >
            {/* Hokkaido */}
            <path
              d="M350 50 L400 80 L420 120 L390 150 L340 140 L320 100 L330 70 Z"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all cursor-pointer"
              title="Hokkaido"
            />

            {/* Honshu */}
            <path
              d="M300 140 L320 160 L350 180 L380 220 L350 260 L300 300 L250 320 L200 310 L180 280 L160 240 L180 200 L220 180 L260 170 Z"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all cursor-pointer"
              title="Honshu"
            />

            {/* Shikoku */}
            <path
              d="M180 300 L220 290 L240 310 L220 330 L190 330 L170 320 Z"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all cursor-pointer"
              title="Shikoku"
            />

            {/* Kyushu */}
            <path
              d="M120 280 L150 270 L170 290 L160 330 L130 350 L100 330 L90 300 Z"
              className="fill-nadeshiko/20 hover:fill-nadeshiko/40 transition-all cursor-pointer"
              title="Kyushu"
            />

            {/* Cities/Points */}
            <circle
              cx="320"
              cy="100"
              r="4"
              className="fill-nadeshiko"
              title="Sapporo"
            />
            <circle
              cx="280"
              cy="200"
              r="4"
              className="fill-nadeshiko"
              title="Tokyo"
            />
            <circle
              cx="220"
              cy="240"
              r="4"
              className="fill-nadeshiko"
              title="Osaka"
            />
            <circle
              cx="150"
              cy="300"
              r="4"
              className="fill-nadeshiko"
              title="Fukuoka"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}

export default Home;
