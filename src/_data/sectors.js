// Loads sectors settings (edited via Decap) so templates can use {{ sectors.* }}
const fs = require("fs");
const path = require("path");
module.exports = () => {
  try {
    const file = path.join(__dirname, "../content/settings/sectors.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn("Could not load sectors.json:", e.message);
    return {};
  }
};
