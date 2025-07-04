const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const folder = path.join(__dirname, '../content/ticker_extra');
const outputFile = path.join(__dirname, '../data/ticker_extra.json');

const files = fs.readdirSync(folder).filter(f => f.endsWith('.md'));

const items = files.map(file => {
  const content = fs.readFileSync(path.join(folder, file), 'utf8');
  const { data } = matter(content);
  return { text: data.text };
});

fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
console.log('✅ ticker_extra.json generated.');
