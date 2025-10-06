//core modules
const path = require('path');

//external module
const express = require('express');
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(expressSession);
const mongoUrl ='mongodb+srv://aakashpatle781_db_user:v61rs8AGX18JLUDN@cluster0.wanobx7.mongodb.net/airbnbclone';

const mongoose = require('mongoose');

//local moduesls
const storeRouter = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { authRouter } = require('./routes/authRouter');

const rootPath = require('./utils/pathUtil');
const { errorController } = require('./controllers/errorController');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDbStore({
  uri: mongoUrl,
  collection: 'mySessions',
})

app.use(express.urlencoded());
app.use(
  expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  console.log('cookie check middleware', req.get('Cookie'));
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use('/host', hostRouter);

app.use('/host', (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
});

app.use(express.static(path.join(rootPath, 'public')));

app.use(errorController);

const PORT = 3000;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to mongoDb using mongoose');
    app.listen(PORT, (req, res) => {
      console.log(`server is running at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('error in connecting to mongoDb using mongoose', error);
  });
