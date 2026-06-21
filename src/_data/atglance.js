// Loads atglance settings (edited via Decap) so templates can use {{ atglance.* }}
const fs = require("fs");
const path = require("path");
module.exports = () => {
  try {
    const file = path.join(__dirname, "../content/settings/atglance.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn("Could not load atglance.json:", e.message);
    return {};
  }
};
