// Loads timeline settings (edited via Decap) so templates can use {{ timeline.* }}
const fs = require("fs");
const path = require("path");
module.exports = () => {
  try {
    const file = path.join(__dirname, "../content/settings/timeline.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn("Could not load timeline.json:", e.message);
    return {};
  }
};
