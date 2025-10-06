const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHouse) => {
    res.render('store/index', {
      registeredHouse,
      pageTitle: 'airbnb Home',
      currentPage: 'index',
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHouse) => {
    res.render('store/homeList', {
      registeredHouse,
      pageTitle: 'Homes List',
      currentPage: 'home',
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    pageTitle: 'Your Bookings',
    currentPage: 'bookings',
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHouse) => {
    res.render('store/favouriteList', {
      registeredHouse,
      pageTitle: 'Favourite List',
      currentPage: 'favouriteList',
    });
  });
};
