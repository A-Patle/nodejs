exports.errorController = (req, res, next) => {
  res.render('404Page', {
    pageTitle: 'Page not Found',
    currentPage: '404',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
