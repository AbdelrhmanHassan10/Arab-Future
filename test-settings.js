fetch('https://simsar.acwad.tech/public/api/settings')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
