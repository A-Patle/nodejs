//core modules
const path = require('path');

//external module
const express = require('express');
const mongoose = require('mongoose');

// mongoUrl for atlas
const mongoUrl =
  'mongodb+srv://aakashpatle781_db_user:v61rs8AGX18JLUDN@cluster0.wanobx7.mongodb.net/todo';

//local module
const { errorController } = require('./controllers/errorController');

const app = express();

app.use(express.urlencoded());
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
