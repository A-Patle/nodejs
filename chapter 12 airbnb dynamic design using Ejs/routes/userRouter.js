//core modules
const path = require('path');

//external module
const express = require('express');
const userRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');
const { resgisteratedHouse } = require('../routes/hostRouter');

userRouter.get('/', (req, res, next) => {
  console.log(resgisteratedHouse);

  // res.sendFile(path.join(rootPath, 'views', 'home.html'));
  res.render('home', { resgisteratedHouse,pageTitle:'airbnb Home' });
});

module.exports = userRouter;
