import * as cheerio from 'cheerio';

async function testParse() {
  const res = await fetch('https://redlanternanalytica.com/wp-json/wp/v2/pages?slug=mentors');
  const data = await res.json();
  const html = data[0].content.rendered;
  
  const $ = cheerio.load(html);
  
  const mentors = [];
  
  // Elementor image boxes usually have a specific class structure
  $('.elementor-image-box-wrapper').each((i, el) => {
    const img = $(el).find('img').attr('src');
    const name = $(el).find('.elementor-image-box-title').text().trim();
    const desc = $(el).find('.elementor-image-box-description').text().trim();
    
    if (name) {
      mentors.push({ name, img, desc });
    }
  });
  
  console.log(JSON.stringify(mentors, null, 2));
}

testParse();
