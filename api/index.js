const express = require('express');
const router = express.Router();

const userRouter = require('./desktop');
const topicRouter = require('./map');
const messageRouter = require('./users');

router.use('/', desktopRouter);
router.use('/', mapRouter);
router.use('/', usersRouter);

module.exports = router;