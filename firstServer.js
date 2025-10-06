const http = require('http');

// function requestListner(req, res) {
//   console.log(req);
// }

// http.createServer(requestListner);
let server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node JS course</title></head>');
    res.write('<body><h1>Welocme to Home Page</h1></body>');
    res.write('</html>');
    return res.end();
  } else if (req.url === '/product') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node JS course</title></head>');
    res.write('<body><h1>ceckout our Product Page</h1></body>');
    res.write('</html>');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS course</title></head>');
  res.write('<body><h1>testing html resoponse</h1></body>');
  res.write('</html>');
  return res.end();

  // process.exit() to close the event loop
});

let PORT = 3030;
server.listen(PORT, () => {
  console.log(`server is running at localhost : http://127.0.0.1:${PORT}/ `);
});
