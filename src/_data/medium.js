// src/_data/medium.js
// Pulls your latest Medium posts at BUILD TIME.
// Designed to FAIL SAFE: if anything goes wrong (no handle set, Medium
// unreachable, dependency missing), it quietly returns [] so the site
// always builds. Your own blog posts are never affected by this.

// 1. Set your Medium handle here once you have a Medium profile.
//    Leave as "" to skip Medium entirely until you're ready.
const MEDIUM_HANDLE = ""; // e.g. "@tayotubusin"  (keep the @)

module.exports = async function () {
  if (!MEDIUM_HANDLE) return [];

  try {
    // Loaded inside try so a missing dependency can't break the build
    const Parser = require("rss-parser");
    const parser = new Parser();
    const feed = await parser.parseURL(`https://medium.com/feed/${MEDIUM_HANDLE}`);

    return (feed.items || []).map((item) => ({
      title: item.title,
      link: item.link,
      date: item.isoDate || item.pubDate,
      excerpt: (item.contentSnippet || "").slice(0, 200),
      categories: item.categories || [],
    }));
  } catch (err) {
    console.warn("Medium feed skipped:", err.message);
    return [];
  }
};
