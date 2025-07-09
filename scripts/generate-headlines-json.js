const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

// Collect all markdown files from headlines directory
const files = glob.sync('content/headlines/*.md');

// Parse and collect all headlines
const headlines = files.map(file => {
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    title: data.title || '',
    date: data.publishedDate || '',
    category: data.category || '',
    author: data.author || '',
    content: content.trim(),
    filename: path.basename(file),
  };
});

// Sort by published date (newest first)
headlines.sort((a, b) => new Date(b.date) - new Date(a.date));

// Split into homepage (top 10) and archive (rest)
const top10 = headlines.slice(0, 10);
const archive = headlines.slice(10);

// Output JSON files
fs.mkdirSync('data', { recursive: true });

fs.writeFileSync('data/headlines.json', JSON.stringify(top10, null, 2));
fs.writeFileSync('data/archive.json', JSON.stringify(archive, null, 2));

// Optional: If you're already generating a main headline file:
const mainHeadlinePath = 'content/main-headline.md';
if (fs.existsSync(mainHeadlinePath)) {
  const raw = fs.readFileSync(mainHeadlinePath, 'utf-8');
  const { data, content } = matter(raw);
  const main = {
    title: data.title || '',
    date: data.publishedDate || '',
    category: data.category || '',
    author: data.author || '',
    content: content.trim(),
  };
  fs.writeFileSync('data/main-headline.json', JSON.stringify(main, null, 2));
}
