//core modules
const path = require('path');

//external module
const express = require('express');
const homeRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');

homeRouter.get('/', (req, res, next) => {
  console.log(`Home page -> req.method ${req.method}, req.path ${req.path}`);
  res.sendFile(path.join(rootPath, 'views', 'homepage.html'));
});


module.exports = homeRouter;
