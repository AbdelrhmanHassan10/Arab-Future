const fs = require('fs');
fs.copyFileSync('public/samsar_logo_transparent.png', 'app/icon.png');
console.log('Copied logo to app/icon.png');
