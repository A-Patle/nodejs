//external module
const express = require('express');
const authRouter = express.Router();

//local module
const {
  getLogin,
  postLogin,
  postLogout,
} = require('../controllers/authController');

authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/logout', postLogout);

exports.authRouter = authRouter;
