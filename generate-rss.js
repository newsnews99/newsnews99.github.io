const fs = require('fs');
const builder = require('xmlbuilder');

// Load headlines.json
const headlines = JSON.parse(fs.readFileSync('data/headlines.json', 'utf-8'));

// Create RSS XML
const feed = builder.create('rss', { encoding: 'utf-8' }).att('version', '2.0');

const channel = feed.ele('channel');
channel.ele('title', {}, 'The Federation Sun');
channel.ele('link', {}, 'https://fedsun.news');
channel.ele('description', {}, 'Latest headlines and updates from The Federation Sun.');
channel.ele('language', {}, 'en-au');
channel.ele('lastBuildDate', {}, new Date().toUTCString());

// Create items
headlines.slice(0, 20).forEach(item => {
  const date = new Date(item.date);
  channel.ele('item')
    .ele('title', {}, item.title).up()
    .ele('link', {}, item.url).up()
    .ele('description', {}, item.description || '').up()
    .ele('pubDate', {}, date.toUTCString()).up()
    .ele('guid', {}, item.url);
});

// Write feed.xml with XSL reference
fs.writeFileSync('feed.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss-style.xsl"?>
${feed.end({ pretty: true })}
`);

console.log('✅ feed.xml generated.');
