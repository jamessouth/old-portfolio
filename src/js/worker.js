
onmessage = e => {
  console.log(e);
  let h = `hello ${new Date().getMilliseconds()}`;
  postMessage({
    h
  });
}
