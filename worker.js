addEventListener('message', (e) => { // eslint-disable-line
  // console.log(e.data);
  // postMessage(Math.random());
  const data = {
    id: e.data,
    num: Math.random(),
  }
  postMessage(data);
});
