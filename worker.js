addEventListener('message', (e) => { // eslint-disable-line
  const data = {
    id: e.data.id,
    name: e.data.name,
  }
  setTimeout(() => {
    
    postMessage(data);
  }, 5612);
});
