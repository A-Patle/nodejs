//external module
const express = require('express');
const hostRouter = express.Router();

//local module
const {
  getAddHome,
  postAddHome,
  getHostHomes,
  getEditHome,
  postEditHome,
  deleteEditHome,
} = require('../controllers/hostController');

hostRouter.get('/add-home', getAddHome);
hostRouter.post('/add-home', postAddHome);
hostRouter.get('/host-homes-list', getHostHomes);
hostRouter.get('/edit-home/:homeId', getEditHome);
hostRouter.post('/edit-home', postEditHome);
hostRouter.post('/delete-home/:id', deleteEditHome);

exports.hostRouter = hostRouter;
