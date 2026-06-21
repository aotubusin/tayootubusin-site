// Loads expertise settings (edited via Decap) so templates can use {{ expertise.* }}
const fs = require("fs");
const path = require("path");
module.exports = () => {
  try {
    const file = path.join(__dirname, "../content/settings/expertise.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn("Could not load expertise.json:", e.message);
    return {};
  }
};
