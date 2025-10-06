//external module
const express = require('express');
const storeRouter = express.Router();

//local module
const {
  getHomes,
  getBookings,
  getFavouriteList,
  postAddFavouriteList,
  postRemoveFavouriteList,
  getIndex,
  getHomeDetails
} = require('../controllers/storeController');

storeRouter.get('/', getIndex);
storeRouter.get('/bookings', getBookings);
storeRouter.get('/homes', getHomes);
storeRouter.get('/favourites', getFavouriteList);
storeRouter.post('/favourites', postAddFavouriteList);
storeRouter.post('/favourites/delete/:id', postRemoveFavouriteList);



storeRouter.get('/homes/:id', getHomeDetails);


module.exports = storeRouter;
