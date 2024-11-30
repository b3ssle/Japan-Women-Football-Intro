import React, { memo } from "react";
import { Map } from "lucide-react";
import japan from "@svg-maps/japan";

const MapChart = ({ venues, onVenueClick }) => {
  const uniqueVenues = [...new Set(venues.map((v) => v.id))].map((id) =>
    venues.find((v) => v.id === id)
  );

  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 438 516" className="w-full h-full">
        {japan.locations.map((location) => (
          <path
            key={location.id}
            d={location.path}
            fill="#F3F4F6"
            stroke="#D1D5DB"
            strokeWidth={0.5}
          />
        ))}

        {uniqueVenues.map((venue) => (
          <g
            key={venue.id}
            transform={`translate(${venue.coordinates.x}, ${venue.coordinates.y})`}
          >
            <circle
              r="4"
              fill="#E91E63"
              stroke="#FFFFFF"
              strokeWidth="2"
              className="cursor-pointer hover:r-[5] transition-all"
              onClick={() => onVenueClick(venue)}
            />
            <circle
              r="8"
              fill="#E91E63"
              fillOpacity="0.2"
              className="cursor-pointer"
              onClick={() => onVenueClick(venue)}
            />
            <text
              y="20"
              fontSize="8"
              fill="#666"
              textAnchor="middle"
              className="select-none pointer-events-none"
            >
              {venue.short}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const WeeklyVenuesMap = ({ matches, onVenueClick }) => {
  const venues = matches.map((match) => match.venue);
  const uniqueVenues = [...new Set(venues.map((v) => v.id))].map((id) =>
    venues.find((v) => v.id === id)
  );

  return (
    <div>
      <h2 className="text-2xl mb-6 bg-nadeshiko text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Map className="w-6 h-6" />
        今週のマップ
      </h2>
      <div className="bg-white rounded-lg shadow h-[600px] overflow-hidden p-4">
        <MapChart venues={uniqueVenues} onVenueClick={onVenueClick} />
      </div>
    </div>
  );
};

export default memo(WeeklyVenuesMap);
