import * as cheerio from 'cheerio';

async function run() {
  const res = await fetch('https://redlanternanalytica.com/mentors/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const results = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    // find nearest div text
    const text = $(el).closest('.elementor-widget-wrap').text().trim().replace(/\s+/g, ' ');
    if (text) {
      results.push({ src, text });
    }
  });
  
  console.log(JSON.stringify(results.slice(0, 15), null, 2));
}
run();
