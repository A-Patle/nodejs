//core modules
const path = require('path');

//external module
const express = require('express');
const hostRouter = express.Router();

//local module
const rootPath = require('../utils/pathUtil');

hostRouter.get('/add-home', (req, res, next) => {
  // res.sendFile(path.join(rootPath, 'views', 'addhome.html'));
  res.render('addhome', { pageTitle: 'Add home to airbnb' });
});

const resgisteratedHouse = [];
hostRouter.post('/add-home', (req, res, next) => {
  console.log('home resgisteration for', req.body.houseName);
  resgisteratedHouse.push({ houseName: req.body.houseName });

  // res.sendFile(path.join(rootPath, 'views', 'resgisterationsuccess.html'));
  res.render('resgisterationsuccess', { pageTitle: 'Home added Successfully' });
});

module.exports = {
  hostRouter,
  resgisteratedHouse,
};
