//core modules
const path = require('path');

//external module
const express = require('express');
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(expressSession);
const multer = require('multer');

// mongoUrl for atlas
const mongoUrl =
  'mongodb+srv://aakashpatle781_db_user:v61rs8AGX18JLUDN@cluster0.wanobx7.mongodb.net/airbnbclone';

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
});

const ramdomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, ramdomString(10) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo')); // photo should match with the name attribute in form input
app.use(express.static(path.join(rootPath, 'public')));
app.use('/uploads', express.static(path.join(rootPath, 'uploads')));
app.use('/host/uploads', express.static(path.join(rootPath, 'uploads')));
app.use('/homes/uploads', express.static(path.join(rootPath, 'uploads')));

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
  // console.log('cookie check middleware', req.get('Cookie'));
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
