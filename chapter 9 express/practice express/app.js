//core module
const bodyParser = require('body-parser');
const path = require('path');

//external module
const express = require('express');

//local module
const rootPath = require('./utils/pathUtil');
const contactRouter = require('./routes/contactRouter');
const homeRouter = require('./routes/homeRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(homeRouter);
app.use(contactRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', '404.html'));
});

const PORT = 2000;
app.listen(PORT, (req, res) => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
});
