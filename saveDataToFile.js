const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./statsdata');
const options = {
  headers: {
	'User-Agent': 'jamessouth',
	'Accept': 'application/vnd.github.v3+json'
  }
};

https.get('https://api.github.com/repos/jamessouth/see-through/stats/commit_activity', options, chunks => {
  console.log(': ', chunks.headers);
  chunks.pipe(file);
});
