import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-nadeshiko transition-colors"
        >
          Japan Women's Football Introduction
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="hover:text-nadeshiko transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link
                to="/empressscup_2024"
                className="hover:text-nadeshiko transition-colors"
              >
                皇后杯
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
