const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootPath, 'views', 'addhome.html'));
  res.render('host/editHome', {
    pageTitle: 'Add home to airbnb',
    currentPage: 'addHome',
    editing: false,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });

  home
    .save()
    .then(() => {
      console.log('New Home added');
    })
    .catch((err) => console.log(err));

  // res.sendFile(path.join(rootPath, 'views', 'resgisterationsuccess.html'));
  res.redirect('/host/host-homes-list');
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHouse) => {
    res.render('host/hostHomeList', {
      registeredHouse,
      pageTitle: 'Host Homes List',
      currentPage: 'hostHomes',
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log('home not found for editing');
      return res.redirect('/host/host-homes-list');
    } else {
      console.log('edit mode', editing, homeId, home);

      res.render('host/editHome', {
        home: home,
        pageTitle: 'Edit your home',
        currentPage: 'hostHomes',
        editing: editing,
      });
    }
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;

  Home.findById(id)
    .then((home) => {
      (home.houseName = houseName),
        (home.price = price),
        (home.location = location),
        (home.rating = rating),
        (home.photoUrl = photoUrl),
        (home.description = description);
      home
        .save()
        .then(() => {
          console.log('Home updated');
        })
        .catch((err) => console.log('error while updating home', err));
    })
    .catch((err) => console.log('error while finding home', err));

  res.redirect('/host/host-homes-list');
};

exports.deleteEditHome = (req, res, next) => {
  const homeId = req.params.id;
  console.log('homeId to be deleted', homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect('/host/host-homes-list');
    })
    .catch((err) => {
      console.log('Error while deleting', err);
      res.redirect('/host/host-homes-list');
    });
};
