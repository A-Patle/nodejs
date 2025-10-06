const http = require('http');

let server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url.toLowerCase() === '/home') {
    res.write('<h1>Welocme to Home Page</h1>');
    return res.end();
  } else if (req.url.toLowerCase() === '/men') {
    res.write("<h1>Welocme to Men's Page</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === '/woman') {
    res.write("<h1>Welocme to Women's Page</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === '/kids') {
    res.write("<h1>Welocme to kid's Page</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === '/cart') {
    res.write('<h1>Welocme to Cart Page</h1>');
    return res.end();
  } else {
    res.write(`
      
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Myntra</title>
        </head>
        <body>
          <head>
            <nav>
              <ul>
                <li><a href="/Home">Home</a></li>
                <li><a href="/Men">Men</a></li>
                <li><a href="/Woman">Women</a></li>
                <li><a href="/Kids">Kids</a></li>
                <li><a href="/Cart">Cart</a></li>
              </ul>
            </nav>
          </head>
        </body>
      </html>
      `);
    return res.end();
  }
});

let PORT = 3030;
server.listen(PORT, () => {
  console.log(`server is running at localhost : http://127.0.0.1:${PORT}/ `);
});
