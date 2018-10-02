const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  if(req.url.includes('favicon')){
    res.writeHead(204);
    res.end();
  }

  console.log(req.url);
  if(req.url === '/'){
    fs.readFile('dist/index.html', 'utf8', (err, html) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  }

  // if(req.url === '/styles.css'){
  //   fs.readFile('styles.css', 'utf8', (err, css) => {
  //     res.writeHead(200, { "Content-Type": "text/css" });
  //     res.end(css);
  //   });
  // }

  // if(req.url === '/web-animations-next.min.js'){
  //   fs.readFile('web-animations-next.min.js', 'utf8', (err, js) => {
  //     res.writeHead(200, { "Content-Type": "application/javascript" });
  //     res.end(js);
  //   });
  // }

  if(req.url.includes('bundle')){
    fs.readFile(path.join(__dirname, '/dist', req.url), 'utf8', (err, js) => {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(js);
    });
  }



  if(req.url.includes('/images/') && /(\.png|\.svg|\.jpg|\.gif)/.test(req.url)){
    const ext = req.url.includes('.jpg') ? 'jpeg' : path.extname(req.url).substring(1);
    fs.readFile(path.join(__dirname, '/dist', req.url), (err, img) => {
      res.writeHead(200, { "Content-Type": `image/${ext}` });
      res.end(img);
    });
  }



  // if(req.url.includes('/images/')){
  //   const ext = req.url.includes('.jpg') ? 'jpeg' : path.extname(req.url).substring(1);
  //   fs.readFile(path.join(__dirname, req.url), (err, img) => {
  //     res.writeHead(200, { "Content-Type": `image/${ext}` });
  //     res.end(img);
  //   });
  // }

});

server.listen(3000, () => {
  console.log('server running on port 3000!');
})
