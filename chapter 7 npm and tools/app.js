const http = require('http');
const requestHandler = require('./../practice2/requestHandler');

let server = http.createServer((req, res) => {
  console.log('req ', req.method,req.url);
  res.end();
});

let PORT = 3030;
server.listen(PORT, () => {
  console.log(`server is running at localhost : http://127.0.0.1:${PORT}/ `);
});
