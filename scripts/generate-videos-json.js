const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const folder = 'content/videos';
const outFile = 'data/videos.json';

const files = fs.readdirSync(folder).filter(file => file.endsWith('.md'));

const allVideos = files.map(filename => {
  const filePath = path.join(folder, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);

  return {
    title: data.title || '',
    date: data.date || '',
    author: data.author || '',
    description: data.description || '',
    video_url: data.video_url || ''
  };
});

// Newest first
allVideos.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outFile, JSON.stringify(allVideos, null, 2));
console.log(`Wrote ${allVideos.length} videos to ${outFile}`);
