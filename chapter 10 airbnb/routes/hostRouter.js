//core modules
const path = require('path');

//external module
const express = require('express');
const hostRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');

hostRouter.get('/add-home', (req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', 'addhome.html'));
});

hostRouter.post('/add-home', (req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', 'resgisterationsuccess.html'));
});

module.exports = hostRouter;
