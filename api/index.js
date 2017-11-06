const express = require('express');
const router = express.Router();

const desktopRouter = require('./desktop');
const mapRouter = require('./map');
const usersRouter = require('./users');

router.use('/', desktopRouter);
router.use('/', mapRouter);
router.use('/', usersRouter);

// Check if user is valid
function userAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('User is good');
    next();
  } else {
    console.log('User not good');
    res.redirect('/login');
  }
}

module.exports = router;