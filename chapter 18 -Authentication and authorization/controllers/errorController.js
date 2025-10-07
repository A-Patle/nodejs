exports.errorController = (req, res, next) => {
  // res.sendFile(path.join(rootPath, 'views', '404.html'));
  res.render('404Page', {
    pageTitle: 'Page not Found',
    currentPage: '404',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
