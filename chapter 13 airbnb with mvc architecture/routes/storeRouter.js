//external module
const express = require('express');
const storeRouter = express.Router();

//local module
const {
  getHomes,
  getBookings,
  getFavouriteList,
  getIndex,
} = require('../controllers/storeController');

storeRouter.get('/', getIndex);
storeRouter.get('/bookings', getBookings);
storeRouter.get('/homes', getHomes);
storeRouter.get('/favourites', getFavouriteList);

module.exports = storeRouter;
