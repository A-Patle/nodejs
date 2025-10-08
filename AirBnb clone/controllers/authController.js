const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    currentPage: 'login',
    isLoggedIn: false,
    oldInput: { email: '' },
    errors: [],
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      currentPage: 'login',
      isLoggedIn: false,
      errors: ['Users does not exist with this email.'],
      oldInput: { email },
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      currentPage: 'login',
      isLoggedIn: false,
      errors: ['Invalid password.'],
      oldInput: { email },
      user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    currentPage: 'signup',
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: '',
    },
    user: {},
  });
};

exports.postSignup = [
  check('firstName')
    .trim()
    .isLength({ min: 2, max: 12 })
    .withMessage('First name should be atleast 2 characters long')
    .matches(/^[A-Za-z]+$/)
    .withMessage('First name should contains only letters'),

  check('lastName')
    .matches(/^[A-Za-z]*$/)
    .withMessage('Last name should contains only letters'),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password should contains at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password should contains at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password should contains at least one number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password should contains at least one special character'),

  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('userType')
    .trim()
    .isIn(['host', 'guest'])
    .withMessage('User type must be either "host" or "guest"'),

  check('terms')
    .equals('on')
    .withMessage('You must accept the terms and conditions'),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: 'Signup',
        currentPage: 'signup',
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user: {},
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        res.status(500).render('auth/signup', {
          pageTitle: 'Signup',
          currentPage: 'signup',
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, password, userType },
          user: {},
        });
      });
  },
];
