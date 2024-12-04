import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 100); // 100ms delay before closing
  };

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-nadeshiko transition-colors"
        >
          Japan Women's Football Intro
        </Link>
        <nav>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="px-4 py-2 rounded hover:bg-nadeshiko/10 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <li>
                  <Link
                    to="/weLeague_2024"
                    className="block px-4 py-2 hover:bg-nadeshiko/10 transition-colors"
                  >
                    WEリーグ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/empressscup_2024"
                    className="block px-4 py-2 hover:bg-nadeshiko/10 transition-colors"
                  >
                    皇后杯
                  </Link>
                </li>
                <li>
                  <Link
                    to="/UniversityWomens_2024"
                    className="block px-4 py-2 hover:bg-nadeshiko/10 transition-colors"
                  >
                    大学女子選手権
                  </Link>
                </li>
                <li>
                  <Link
                    to="/HighSchoolWomens_2024"
                    className="block px-4 py-2 hover:bg-nadeshiko/10 transition-colors"
                  >
                    高校女子選手権
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
