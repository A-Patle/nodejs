//core modules
const path = require('path');

//external module
const express = require('express');

//local moduesls
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootPath = require('./utils/pathUtil');

const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use('/host', hostRouter);

app.use(express.static(path.join(rootPath, 'public')))

app.use((req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', '404.html'));
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
});
