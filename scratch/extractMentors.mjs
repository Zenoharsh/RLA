import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/mentors_raw.html', 'utf8');
const $ = cheerio.load(html);

const results = [];
$('img').each((i, el) => {
  const src = $(el).attr('src');
  // find the closest parent that contains text
  const parentText = $(el).parent().parent().parent().text().trim().replace(/\s+/g, ' ');
  results.push({ src, text: parentText });
});

console.log(JSON.stringify(results.slice(0, 20), null, 2));
