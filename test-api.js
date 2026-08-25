const fetch = require('node-fetch');
async function test() {
  const res = await fetch('http://127.0.0.1:8000/api/units');
  const data = await res.json();
  console.log(JSON.stringify(data.data[0] || data[0], null, 2));
}
test();
