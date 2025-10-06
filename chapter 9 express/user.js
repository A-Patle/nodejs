const fs = require('fs');

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);
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
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    })
    req.on('end', () => {
      let parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const params = new URLSearchParams(parseBody)
      // let bodyObject={}
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }

      const bodyObject = Object.fromEntries(params)
      console.log(bodyObject);
    fs.writeFileSync('user.txt', JSON.stringify(bodyObject));

      
    })
    res.statusCode = 302;
    res.setHeader('location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS course</title></head>');
  res.write('<body><h1>testing html resoponse</h1></body>');
  res.write('</html>');
  return res.end();
  // process.exit() to close the event loop
};

module.exports = userRequestHandler;
