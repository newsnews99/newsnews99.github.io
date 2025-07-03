// scripts/generate-sitemap.js

const fs = require("fs");
const path = require("path");

// Path to your headlines JSON
const headlinesPath = path.join(__dirname, "../data/headlines.json");
const headlines = JSON.parse(fs.readFileSync(headlinesPath, "utf-8"));

// Base URL of your site
const BASE_URL = "https://fedsun.news";

// Today's date in YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

// Start XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add homepage
sitemap += `  <url>\n`;
sitemap += `    <loc>${BASE_URL}/</loc>\n`;
sitemap += `    <lastmod>${today}</lastmod>\n`;
sitemap += `  </url>\n`;

// Add headlines
headlines.forEach(item => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${BASE_URL}${item.url}</loc>\n`;
  sitemap += `    <lastmod>${item.date ? item.date.split("T")[0] : today}</lastmod>\n`;
  sitemap += `  </url>\n`;
});

// Close XML
sitemap += `</urlset>\n`;

// Output to public/sitemap.xml
const outputPath = path.join(__dirname, "../sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");

console.log("✅ sitemap.xml generated successfully.");
