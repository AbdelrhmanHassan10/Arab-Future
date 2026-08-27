const https = require('https');

https.get('https://simsar.acwad.tech/public/api/renovation-packages', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("renovation-packages status:", res.statusCode);
    console.log("renovation-packages data:", data.substring(0, 300));
  });
});

https.get('https://simsar.acwad.tech/public/api/packages', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("packages status:", res.statusCode);
    console.log("packages data:", data.substring(0, 300));
  });
});
