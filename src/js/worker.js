addEventListener('message', (e) => { // eslint-disable-line
  console.log(e);
  postMessage(e.data);
});
