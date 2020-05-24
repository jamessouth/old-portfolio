addEventListener('message', (e) => { // eslint-disable-line
  let a = Math.floor(Math.random()*1000)/10, b = Math.floor(Math.random()*1000)/10, c = Math.floor(Math.random()*1000)/10;
  let tot = a+b+c;
  let x = Math.floor(a/tot*1000)/10, y = Math.floor(b/tot*1000)/10, z = Math.floor(c/tot*1000)/10;
  console.log('ddd: ', x, y, z, x+z+y);
  const data = {
    id: e.data.id,
    bar: `linear-gradient(to right, red ${x}%, orange ${x}% ${parseFloat((x+y).toFixed(2), 10)}%, blue ${parseFloat((x+y).toFixed(2), 10)}%)`,
    zip: `${x}, ${x+y}, ${x+z+y}`
  }
  postMessage(data);
});
