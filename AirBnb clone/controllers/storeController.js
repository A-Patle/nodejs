const path = require('path');
const Home = require('../models/home');
const User = require('../models/user');
const rootPath = require('../utils/pathUtil');

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHouse) => {
    res.render('store/index', {
      registeredHouse,
      pageTitle: 'airbnb Home',
      currentPage: 'index',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    pageTitle: 'Your Bookings',
    currentPage: 'bookings',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render('store/favouriteList', {
    favouriteHouse: user.favourites,
    pageTitle: 'Favourite List',
    currentPage: 'favouriteList',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddFavouriteList = async (req, res) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    user.save();
  }
  return res.redirect('/favourites');
};

exports.postRemoveFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const homeId = req.params.id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect('/favourites');
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
        user: req.session.user,
      });
    }
  });
};

exports.getHouseRules = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }

  const homeId = req.params.homeId;
  const rulesFileName = `house_${homeId}_rules.pdf`;
  const filePath = path.join(rootPath, 'rules', rulesFileName);

  // Use res.download to trigger download in browser
  res.download(filePath, `Rules_${homeId}.pdf`, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      next(err);
    }
  });
};
