const fetch = require('node-fetch');
fetch('http://localhost:3000/api/renovation-packages')
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
