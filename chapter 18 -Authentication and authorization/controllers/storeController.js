const Favourite = require('../models/favourite');
const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHouse) => {
    res.render('store/index', {
      registeredHouse,
      pageTitle: 'airbnb Home',
      currentPage: 'index',
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHouse) => {
    res.render('store/homeList', {
      registeredHouse,
      pageTitle: 'Homes List',
      currentPage: 'home',
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    pageTitle: 'Your Bookings',
    currentPage: 'bookings',
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate('homeId')
    .then((favourites) => {
      const favouriteHouse = favourites.map((fav) => fav.homeId);
      res.render('store/favouriteList', {
        favouriteHouse,
        pageTitle: 'Favourite List',
        currentPage: 'favouriteList',
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddFavouriteList = (req, res) => {
  Favourite.findOne({ homeId: req.body.id })
    .then((fav) => {
      if (fav) {
        console.log('Home is already marked as Favourite');
        res.redirect('/favourites');
      } else {
        fav = new Favourite({ homeId: req.body.id });
        fav
          .save()
          .then((result) => {
            console.log('Added to favourites:', result);
            res.redirect('/favourites');
          })
          .catch((err) => {
            console.log('Error adding to favourites:', err);
            res.redirect('/favourites');
          });
      }
    })
    .catch((err) => {
      console.log('Error adding to favourites:', err);
      res.redirect('/favourites');
    });
};

exports.postRemoveFavouriteList = (req, res, next) => {
  Favourite.findOneAndDelete({ homeId: req.params.id })
    .then((result) => {
      console.log('Removed from favourites:', result);
      res.redirect('/favourites');
    })
    .catch((err) => {
      console.log('Error while removing from favourites:', err);
      res.redirect('/favourites');
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log('home not found', home);
      res.redirect('/homes');
    } else {
      res.render('store/homeDetail', {
        home: home,
        pageTitle: 'Homes Details',
        currentPage: 'home',
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};
