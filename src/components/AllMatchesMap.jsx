import React, { memo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";

const customIcon = divIcon({
  html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="6" fill="#E91E63" stroke="white" stroke-width="2"/>
    <circle cx="12" cy="12" r="8" fill="#E91E63" fill-opacity="0.2"/>
  </svg>`,
  className: "!bg-transparent !border-none",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const createClusterCustomIcon = function (cluster) {
  const count = cluster.getChildCount();
  return divIcon({
    html: `<div class="bg-nadeshiko text-white rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white">
      ${count}
    </div>`,
    className: "!bg-transparent",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const useTooltipStyle = () => {
  useEffect(() => {
    const styleId = "map-tooltip-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .venue-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #E91E63 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          text-shadow: 
            -1px -1px 0 #fff,
             1px -1px 0 #fff,
            -1px  1px 0 #fff,
             1px  1px 0 #fff;
          padding: 0 !important;
          margin-top: -4px !important;
        }
        .venue-label::before {
          display: none !important;
        }
        .leaflet-marker-icon {
          transition: all 0.3s ease;
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);
};

const MapChart = ({ venues = [], matches = [], onVenueClick }) => {
  useTooltipStyle();

  const handleVenueClick = (venue) => {
    // 找出该场地的所有比赛
    const venueMatches = matches.filter((match) => match.venue.id === venue.id);
    if (venueMatches.length > 0) {
      // 将第一场比赛作为主要比赛，并添加所有比赛信息
      const mainMatch = {
        ...venueMatches[0],
        allMatches: venueMatches,
      };
      onVenueClick(mainMatch);
    }
  };

  return (
    <MapContainer
      center={[36.5, 138]}
      zoom={5.5}
      className="w-full h-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={40}
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
      >
        {venues.map((venue) => {
          const venueMatches = matches.filter(
            (match) => match.venue.id === venue.id
          );
          return (
            <Marker
              key={`${venue.id}-${venue.name_jp}`}
              position={[venue.latitude, venue.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleVenueClick(venue),
              }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -4]}
                className="venue-label"
              >
                {venue.short} ({venueMatches.length} 試合)
              </Tooltip>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

const WeeklyVenuesMap = ({ matches = [], onVenueClick }) => {
  const venues = matches?.map((match) => match.venue) || [];
  const uniqueVenues = [
    ...new Set(venues.map((v) => `${v.id}-${v.name_jp}`)),
  ].map((compositeId) => {
    const [id, name] = compositeId.split("-", 2);
    return venues.find((v) => v.id === id && v.name_jp.includes(name));
  });

  return (
    <MapChart
      venues={uniqueVenues}
      matches={matches}
      onVenueClick={onVenueClick}
    />
  );
};

export default memo(WeeklyVenuesMap);
