const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./commitdata');
const options = {
  headers: {
	'User-Agent': 'jamessouth',
	'Accept': 'application/vnd.github.v3+json'
  }
};

https.get('https://api.github.com/repos/jamessouth/dashboard/commits', options, chunks => chunks.pipe(file));