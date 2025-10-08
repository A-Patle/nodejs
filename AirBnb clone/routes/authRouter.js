//external module
const express = require('express');
const authRouter = express.Router();

//local module
const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
} = require('../controllers/authController');

authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/logout', postLogout);
authRouter.get('/signup', getSignup);
authRouter.post('/signup', postSignup);

exports.authRouter = authRouter;