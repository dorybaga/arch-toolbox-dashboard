const express = require('express');
const router = express.Router();

const desktopRouter = require('./desktop');
const mapRouter = require('./map');
const usersRouter = require('./users');

router.use('/', desktopRouter);
router.use('/', mapRouter);
router.use('/', usersRouter);

module.exports = router;