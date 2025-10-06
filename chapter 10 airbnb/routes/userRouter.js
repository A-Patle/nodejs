//core modules
const path = require('path');

//external module
const express = require('express');
const userRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');

userRouter.get('/', (req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', 'home.html'));
});

module.exports = userRouter;
