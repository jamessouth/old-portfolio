const colors = [
  {"typescript": "#2b7489"},
  {"shell": "#89e051"},
  {"go": "#00ADD8"},
  {"vue": "#2c3e50"},
  {"html": "#e34c26"},
  {"css": "#563d7c"},
  {"javascript": "#f1e05a"},
];



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
    console.log(': ', res, sum);
  })
  .catch(e => console.error('eee: ', e));
  


  // let a = Math.floor(Math.random()*1000)/10, b = Math.floor(Math.random()*1000)/10, c = Math.floor(Math.random()*1000)/10;
  // let tot = a+b+c;
  // let x = Math.floor(a/tot*1000)/10, y = Math.floor(b/tot*1000)/10, z = Math.floor(c/tot*1000)/10;
  // console.log('ddd: ', x, y, z, x+z+y);
  // const data = {
  //   id: e.data.id,
  //   bar: `linear-gradient(to right, red ${x}%, orange ${x}% ${parseFloat((x+y).toFixed(2), 10)}%, blue ${parseFloat((x+y).toFixed(2), 10)}%)`,
  //   zip: `${x}, ${x+y}, ${x+z+y}`
  // }
  postMessage('data');
});
