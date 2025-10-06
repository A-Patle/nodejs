//core modules
const path = require('path');

//external module
const express = require('express');
const contactRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');

contactRouter.get('/contact-us', (req, res, next) => {
  console.log(
    `handle middleware with constact us page - > req.method ${req.method},req.path ${req.path}`
  );
  res.sendFile(path.join(rootPath, 'views', 'contactUsGet.html'));
});

contactRouter.post('/contact-us', (req, res, next) => {
  console.log('handling contsct us for post', req.body);
  res.sendFile(path.join(rootPath, 'views', 'contactUsPost.html'));
});

module.exports = contactRouter;
