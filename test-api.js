const https = require('https');

https.get('https://simsar.acwad.tech/public/api/units/BS-1024', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("BS-1024 Keys:", Object.keys(json.data));
    console.log("Has floor_plans?", !!json.data.floor_plans);
    console.log("Has images?", !!json.data.images);
    console.log("Has nearby_places?", !!json.data.nearby_places);
  });
});

https.get('https://simsar.acwad.tech/public/api/units/BS-1032', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("BS-1032 Keys:", Object.keys(json.data));
    console.log("Has floor_plans?", !!json.data.floor_plans);
    console.log("Has images?", !!json.data.images);
    console.log("Has nearby_places?", !!json.data.nearby_places);
  });
});
