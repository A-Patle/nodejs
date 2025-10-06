const Favourite = require('../models/favourite');
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
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHouse) => {
      const favouriteHouse = registeredHouse.filter((home) =>
        favourites.includes(home.id)
      );
      res.render('store/favouriteList', {
        favouriteHouse,
        pageTitle: 'Favourite List',
        currentPage: 'favouriteList',
      });
    });
  });
};

exports.postAddFavouriteList = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, (err) => {
    if (err) {
      console.log('Error adding to favourites:', err);
    }
    res.redirect('/favourites');
  });
};

exports.postRemoveFavouriteList = (req, res, next) => {
  Favourite.deleteById(req.params.id, (err) => {
    if (err) {
      console.log('Error removing from favourites:', err);
    }
    res.redirect('/favourites');
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log('home not found', home);
      res.redirect('/homes');
    } else {
      res.render('store/homeDetail', {
        home: home,
        pageTitle: 'Homes Details',
        currentPage: 'home',
      });
    }
  });
};
