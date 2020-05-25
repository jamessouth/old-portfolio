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

let reset;

addEventListener('message', async (e) => { // eslint-disable-line
  const resHeaders = {};
  try {
    const res = await fetch(`https://api.github.com/repos/jamessouth/${e.data.repoName}/languages`, options);
    res.headers.forEach((x, y) => resHeaders[y] = x);
    console.log('kkk: ', reset);
    reset = resHeaders['x-ratelimit-reset'];
    const data = await res.json();

    const sum = Object.values(data).reduce((a, b) => a += b);
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    let style = 'linear-gradient(to right';
    let tot = 0;
    let title = '';

    sorted.forEach(([lang, count], i) => {
      const pct = Math.floor((count/sum) * 100000) / 1000;
      const color = colors[lang.toLowerCase()];
      if (i == 0) {
        if (sorted.length == 1) {
          style += `, ${color}, ${color})`;
          title += `${lang} ${pct}%`;
        } else {
          style += `, ${color} ${pct}%`;
          title += `${lang} ${pct}%, `;
        }
      } else if (i == sorted.length - 1) {
        style += `, ${color} ${tot}%)`;
        title += `${lang} ${pct}%`;
      } else {
        throw new Error();
        style += `, ${color} ${tot}% ${pct + tot}%`;
        title += `${lang} ${pct}%, `;
      }
      tot += pct;
    });

    postMessage({
      style,
      title,
      id: e.data.id,
    });
  } catch (e) {
    const time = reset ? new Date().getMinutes() - new Date(parseInt(reset, 10) * 1000).getMinutes() : 60;
    postMessage({
      msg: 'rate limit exceeded',
      time,
    });
  }
  


});
