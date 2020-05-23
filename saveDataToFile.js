const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./repodata');
const options = {
  headers: {
	'User-Agent': 'jamessouth',
	'Accept': 'application/vnd.github.v3+json'
  }
};

https.get('https://api.github.com/repos/jamessouth/see-through/languages', options, chunks => {
  console.log(': ', chunks.headers);
  chunks.pipe(file);
});
