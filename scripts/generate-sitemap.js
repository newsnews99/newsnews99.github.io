// scripts/generate-sitemap.js

const fs = require("fs");
const path = require("path");

const headlinesPath = path.join(__dirname, "../data/headlines.json");
const headlines = JSON.parse(fs.readFileSync(headlinesPath, "utf-8"));

const BASE_URL = "https://fedsun.news";
const today = new Date().toISOString().split("T")[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add homepage
sitemap += `  <url>\n`;
sitemap += `    <loc>${BASE_URL}/</loc>\n`;
sitemap += `    <lastmod>${today}</lastmod>\n`;
sitemap += `  </url>\n`;

// Collect unique URLs
const urlSet = new Set();

headlines.forEach(item => {
  if (!item.url) return;

  let fullUrl = "";
  if (item.url.startsWith("http")) {
    // Absolute URL, use as-is
    fullUrl = item.url;
  } else if (item.url.startsWith("/")) {
    // Relative URL
    fullUrl = BASE_URL + item.url;
  } else {
    // Invalid URL (e.g., empty or missing slash)
    return;
  }

  urlSet.add(fullUrl);
});

// Add unique URLs
urlSet.forEach(url => {
  if (!url.startsWith(BASE_URL)) {
    // Skip external links
    return;
  }

  sitemap += `  <url>\n`;
  sitemap += `    <loc>${url}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `  </url>\n`;
});


sitemap += `</urlset>\n`;

const outputPath = path.join(__dirname, "../sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");

console.log("✅ sitemap.xml generated successfully.");
