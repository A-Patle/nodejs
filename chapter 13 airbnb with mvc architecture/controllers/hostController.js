const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootPath, 'views', 'addhome.html'));
  res.render('host/addHome', {
    pageTitle: 'Add home to airbnb',
    currentPage: 'addHome',
  });
};

exports.postAddHome = (req, res, next) => {
  // console.log('home resgisteration for', req.body);

  const { houseName, price, location, rating, photoUrl } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  // res.sendFile(path.join(rootPath, 'views', 'resgisterationsuccess.html'));
  res.render('host/resgisterationSuccess', {
    pageTitle: 'Home added Successfully',
    currentPage: 'homeAdded',
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHouse) => {
    res.render('host/hostHomeList', {
      registeredHouse,
      pageTitle: 'Host Homes List',
      currentPage: 'hostHomes',
    });
  });
};