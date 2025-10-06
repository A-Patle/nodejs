const http = require('http');
const requestHandler = require('./parsingRequest')

let server = http.createServer(requestHandler)

let PORT = 3030;
server.listen(PORT, () => {
  console.log(`server is running at localhost : http://127.0.0.1:${PORT}/ `);
});