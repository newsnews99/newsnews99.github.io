const fs = require('fs');
const matter = require('gray-matter');
const glob = require('glob');

// Load all headline markdown files
const files = glob.sync('content/headlines/*.md');

// Parse and sort by date descending
const headlines = files
  .map(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const parsed = matter(content);
    const data = parsed.data || {};
    return {
      title: data.title || '',
      url: data.url || '#',
      date: data.date || '1970-01-01',
      image: data.image || ''
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Split into latest N and archive
const N = 40;
const latest = headlines.slice(0, N);
const archive = headlines.slice(N);

// Write headlines.json
fs.writeFileSync('data/headlines.json', JSON.stringify(latest, null, 2));

// Write archive.json
fs.writeFileSync('data/archive.json', JSON.stringify(archive, null, 2));

// Load main headline
if (fs.existsSync('content/main-headline.md')) {
  const content = fs.readFileSync('content/main-headline.md', 'utf-8');
  const parsed = matter(content);
  const data = parsed.data || {};
  const mainHeadline = {
    title: data.title || '',
    url: data.url || '#',
    image: data.image || ''
  };
  fs.writeFileSync('data/main-headline.json', JSON.stringify(mainHeadline, null, 2));
} else {
  console.log('No main-headline.md found.');
}
