const sumRequestHandle = (req, res) => {
  console.log('in sum reuqets handler', req.url);
  const body = [];
  // let result;
  req.on('data', (chunk) => body.push(chunk));
  req.on('end', () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.num1) + Number(bodyObj.num2);
    console.log(result);
    res.setHeader('Content-Type', 'text/html');
    res.write(`
           <html lang="en">
          <head>
            <title>Practice Set</title>
          </head>
          <body>
              <h1> sum of two numbers is ${result}</h1>
          </body>
        </html>
      `);
    return res.end();
  });
};

module.exports = sumRequestHandle;
