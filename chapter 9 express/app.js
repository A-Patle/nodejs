//code modules
// const http = require('http');

//external modules
const express = require('express');

//local modules
const userRequestHandler = require('./user');

const app = express();

app.use((req, res, next) => {
  console.log('came in first middleware', req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log('came in second middleware', req.url, req.method);
  res.send('<html>welocme to my paeg</html>');
});

// let server = http.createServer(app);

let PORT = 3030;
app.listen(PORT, () => {
  console.log(`server is running at localhost : http://127.0.0.1:${PORT}/ `);
});
