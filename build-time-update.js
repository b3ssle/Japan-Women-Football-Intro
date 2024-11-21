// build-time-update.js
const fs = require("fs");
const { execSync } = require("child_process");

// Get the last update time in Tokyo timezone
const getLastUpdateTime = () => {
  try {
    return execSync(
      'TZ="Asia/Tokyo" git log -1 --format="%cd" --date=format:"%Y/%m/%d-%H:%M"'
    )
      .toString()
      .trim()
      .replace(/\//g, "-");
  } catch (error) {
    console.error("Error getting git last update time:", error);
    return new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  }
};

// Create environment variable file
const lastUpdateTime = getLastUpdateTime();
fs.writeFileSync(
  ".env.local",
  `VITE_LAST_UPDATE_TIME="${lastUpdateTime}"\n`,
  "utf-8"
);
