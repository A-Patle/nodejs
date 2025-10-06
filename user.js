const http = require('http');
const fs = require('fs');

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
    res.write('<body><h1>Enter your Details</h1>');
    res.write('<form action="/submit-details" method="POST">');

    res.write(
      '<input type="text" name="username" placeholder="Enter your Name"> <br>'
    );
    res.write('<label for="male" >Male : </label>');
    res.write('<input type="radio" name="gender" value="male" id="male">');
    res.write('<label for="female" >Female : </label>');
    res.write(
      '<input type="radio" name="gender" value="female" id="female"><br>'
    );

    res.write('<input type="submit" value="Submit">');

    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  } else if (
    req.url.toLowerCase() === '/submit-details' &&
    req.method == 'POST'
  ) {
    // fs.writeFileSync('user.txt', 'Akash patle'); // sync code blocking code
    fs.writeFile('user.txt', 'aksash patle', () => {
      console.log('succefully');
    });
    res.statusCode = 302;
    res.setHeader('location', '/');
    // return res.end();
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
