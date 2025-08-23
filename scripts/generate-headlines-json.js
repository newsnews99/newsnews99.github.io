// scripts/generate-headlines-json.js
// Builds /data/headlines.json, /data/archive.json, /data/main-headline.json
// from content/*.md with safe fallbacks for missing front-matter.

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const HEADLINES_DIR = path.join(CONTENT_DIR, "headlines");
const MAIN_FILE = path.join(CONTENT_DIR, "main-headline.md");
const DATA_DIR = path.join(ROOT, "data");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

/** Ensure absolute/leading-slash URL for site-relative paths */
function toAbs(u) {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return "/" + String(u).replace(/^\/+/, "");
}

/** Try to parse a date from front-matter; fallback to timestamp in filename */
function parseDate(fmDate, filename) {
  if (fmDate) {
    const d = new Date(fmDate);
    if (!isNaN(d)) return d.toISOString();
  }
  // fallback: headline-YYYYMMDDhhmmss.md
  const m = filename.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (m) {
    const [, Y, M, D, h, m2, s] = m;
    const iso = `${Y}-${M}-${D}T${h}:${m2}:${s}Z`;
    const d = new Date(iso);
    if (!isNaN(d)) return d.toISOString();
  }
  return ""; // last resort
}

/** Get a short description: front-matter -> first paragraph text */
function getDescription(fmDesc, body) {
  if (fmDesc && String(fmDesc).trim()) return String(fmDesc).trim();
  const plain = String(body)
    .replace(/<[^>]+>/g, "")
    .replace(/^#+\s+/gm, "") // headings
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
  const firstPara = plain.split(/\n{2,}/)[0] || "";
  return firstPara.slice(0, 240); // reasonable teaser
}

/** Build one record with the fields your site expects */
function buildItem(file) {
  const raw = fs.readFileSync(file, "utf8");
  const fm = matter(raw);
  const base = path.basename(file);

  const title = fm.data.title || path.parse(base).name;
  const date = parseDate(fm.data.date, base);
  const author = fm.data.author || "The Federation Sun";
  const description = getDescription(fm.data.description, fm.content);

  // image/url can be: data.image/url, or relative paths; normalize to site-absolute
  const image = toAbs(fm.data.image || fm.data.thumbnail || "");
  // If you store a canonical link in front-matter:
  //   url: 'https://...'  OR  url: '/some/path'
  // Otherwise derive from filename (adjust to your routing)
  const slug = base.replace(/\.md$/i, "");
  const derivedUrl = `/headlines/${slug}.html`; // <-- change if needed
  const url = toAbs(fm.data.url || fm.data.link || derivedUrl);

  return { title, date, author, description, image, url };
}

/** MAIN HEADLINE */
function buildMainHeadline() {
  if (!fs.existsSync(MAIN_FILE)) return null;
  const raw = fs.readFileSync(MAIN_FILE, "utf8");
  const fm = matter(raw);
  const title = fm.data.title || "Main Headline";
  const image = toAbs(fm.data.image || "");
  const url = toAbs(fm.data.url || fm.data.link || "/");
  return { title, image, url };
}

/** Collect & sort headlines (newest first by date or filename timestamp) */
function collectHeadlines() {
  const files = glob.sync(path.join(HEADLINES_DIR, "*.md"));
  const items = files.map(buildItem);
  items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return items;
}

/** Write JSON helper */
function writeJSON(relPath, obj) {
  const out = path.join(DATA_DIR, relPath);
  fs.writeFileSync(out, JSON.stringify(obj, null, 2), "utf8");
  console.log("Wrote", relPath, Array.isArray(obj) ? `(${obj.length})` : "");
}

/** Run */
(function run() {
  const headlines = collectHeadlines();
  writeJSON("headlines.json", headlines);
  writeJSON("archive.json", headlines); // same content for now

  const main = buildMainHeadline();
  if (main) writeJSON("main-headline.json", main);
})();
