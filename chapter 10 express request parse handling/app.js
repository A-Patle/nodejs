const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log(
    `First Dummy middleware - > req.method ${req.method},req.path ${req.path}`
  );
  next();
});

app.use((req, res, next) => {
  console.log(
    `second Dummy middleware - > req.method ${req.method},req.path ${req.path}`
  );
  next();
});

// app.use((req, res, next) => {
//   console.log(
//     `third middleware returning response - > req.method ${req.method},req.path ${req.path}`
//   );
//   res.send('<h1>Content sent</h1>');
// });

app.use('/', (req, res, next) => {
  console.log(
    `handle middleware - > req.method ${req.method},req.path ${req.path}`
  );
  next();
});

app.get('/contact-us', (req, res, next) => {
  console.log(
    `handle middleware with constact us page - > req.method ${req.method},req.path ${req.path}`
  );
  res.send(`<html lang="en">
  <head>
    <title>Calculator Page</title>
  </head>
  <body>
    <form action="/contact-us" method="POST">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" placeholder="Enter your Name" /><br>

      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Enter your Email"/><br>

      <input type="submit" name="Submit" />
    </form>
  </body>
</html>`);
});

app.post('/contact-us', (req, res, next) => {
  console.log('handling contsct us for post before body parser', req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post('/contact-us', (req, res, next) => {
  console.log('handling contsct us for post afetre body parser', req.body);
  res.send('<html>Thanks for you details</html>');
});

app.listen(2000, (req, res) => {
  console.log(`server running at http://127.0.0.1:2000/`);
});
