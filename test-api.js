const https = require('https');

https.get('https://simsar.acwad.tech/public/api/units/16', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("Unit 16 Keys:", Object.keys(json.data));
    console.log("Amenities:", json.data.amenities);
    console.log("Features:", json.data.features);
  });
});
