import https from 'https';

https.get('https://www.youtube.com/@RedLanternAnalytica', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/"externalId":"([^"]+)"/);
    if (match) {
      console.log('Channel ID:', match[1]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', console.error);
