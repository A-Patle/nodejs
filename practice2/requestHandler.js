const sumRequestHandle = require('./sum')

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Welocme to Home Page</h1>');
    res.write('<a href="/calculator">Go to Calculator</a>');
    return res.end();
  } else if (req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html lang="en">
        <head>
          <title>Calculator Page</title>
        </head>
        <body>
          <form action="/calculate-result" method="POST">
            <input type="text" name="num1" id="num1" placeholder="Enter first number" />
            <input type="text" name="num2" id="num2" placeholder="Enter second number" />
            <input type="submit" value="Sum" onclick="(sum)" />
          </form>
        </body>
      </html>
`);
    return res.end();
  } else if (req.url.toLowerCase() === '/calculate-result' && req.method === "POST") {
    return sumRequestHandle(req,res)
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>404 Page does not exist to Home Page</h1>');
    res.write('<a href="/">Go to Home</a>');
    return res.end();
  }
};

module.exports = requestHandler;
