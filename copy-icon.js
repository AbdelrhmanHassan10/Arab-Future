const fs = require('fs');
fs.copyFileSync('public/magmoat-logo-d6ae45-transparent.png', 'app/icon.png');
console.log('Copied logo to app/icon.png');
