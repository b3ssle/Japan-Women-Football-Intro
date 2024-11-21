import React from "react";

function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="/Japan-Women-Football-Intro/"
          className="text-2xl font-bold hover:text-nadeshiko transition-colors"
        >
          Japan Women's Football Introduction
        </a>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a
                href="/Japan-Women-Football-Intro/"
                className="hover:text-nadeshiko transition-colors"
              >
                ホーム
              </a>
            </li>
            <li>
              <a
                href="/Japan-Women-Football-Intro/empressscup_2024.html"
                className="hover:text-nadeshiko transition-colors"
              >
                皇后杯
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
