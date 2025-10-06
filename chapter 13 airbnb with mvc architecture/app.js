//core modules
const path = require('path');

//external module
const express = require('express');

//local moduesls
const storeRouter = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const rootPath = require('./utils/pathUtil');
const { errorController } = require('./controllers/errorController');

const app = express();

app.use(express.urlencoded());
app.use(storeRouter);
app.use('/host', hostRouter);

app.use(express.static(path.join(rootPath, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(errorController);

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
});
