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
  // console.log('home resgisteration for', req.body);

  const { houseName, price, location, rating, photoUrl, description } =
    req.body;

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  
  home.save()
    .then(() => {
      console.log('New Home added');
    })
    .catch((err) => console.log(err));

  // res.sendFile(path.join(rootPath, 'views', 'resgisterationsuccess.html'));
  res.redirect('/host/host-homes-list');
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHouse) => {
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

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    id
  );

  home.save().then(() => {
    console.log('Home updated');
  });

  res.redirect('/host/host-homes-list');
};

exports.deleteEditHome = (req, res, next) => {
  const homeId = req.params.id;
  console.log('homeId to be deleted', homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect('/host/host-homes-list');
    })
    .catch((err) => {
      console.log('Error while deleting', err);
      res.redirect('/host/host-homes-list');
    });
};
