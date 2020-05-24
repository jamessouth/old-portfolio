const colors = {
  "typescript": "#2b7489",
  "shell": "#89e051",
  "go": "#00ADD8",
  "vue": "#2c3e50",
  "html": "#e34c26",
  "css": "#563d7c",
  "javascript": "#f1e05a",
};

const options = {
  headers: {
    'User-Agent': 'jamessouth',
    'Accept': 'application/vnd.github.v3+json',
  }
};

addEventListener('message', (e) => { // eslint-disable-line
  fetch(`https://api.github.com/repos/jamessouth/${e.data.repoName}/languages`, options)
  .then(res => res.json())
  .then(res => {
    const sum = Object.values(res).reduce((a, b) => a += b);
    const sorted = Object.entries(res).sort((a, b) => b[1] - a[1]);
    let ans = 'linear-gradient(to right', tot = 0, title = '';
    sorted.forEach(([lang, count], i) => {
      const pct = Math.floor((count/sum) * 100000) / 1000;
      const color = colors[lang.toLowerCase()];
      if (i == 0) {
        ans += `, ${color} ${pct}%`;
        title += `${lang} ${pct}%, `;
      } else if (i == sorted.length - 1) {
        ans += `, ${color} ${tot}%)`;
        title += `${lang} ${pct}%`;
      } else {
        ans += `, ${color} ${tot}% ${pct + tot}%`;
        title += `${lang} ${pct}%, `;
      }
      tot += pct;
      console.log('ddd: ', lang, count);
    });


    

    
    console.log(': ', ans, '\n', title);
  })
  .catch(e => console.error('eee: ', e));
  


  // const data = {
  //   id: e.data.id,
  //   bar: `linear-gradient(to right, red ${x}%, orange ${x}% ${parseFloat((x+y).toFixed(2), 10)}%, blue ${parseFloat((x+y).toFixed(2), 10)}%)`,
  //   zip: `${x}, ${x+y}, ${x+z+y}`
  // }
  postMessage('data');
});
