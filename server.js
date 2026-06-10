const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  
  const routes = {
    '/': './index.html',
    '/index': './index.html',
    '/index.html': './index.html',
    '/pedido': './pedido.html',
    '/pedido.html': './pedido.html',
  };

  let filePath = routes[url];
  
  if (!filePath) {
    filePath = '.' + url;
  }

  const ext = path.extname(filePath) || '.html';
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile('./index.html', (err2, data2) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
