// Loads profile settings (edited via Decap) so templates can use {{ profile.* }}
const fs = require("fs");
const path = require("path");
module.exports = () => {
  try {
    const file = path.join(__dirname, "../content/settings/profile.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn("Could not load profile.json:", e.message);
    return {};
  }
};
