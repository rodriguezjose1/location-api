const router = require('express').Router();

const pointsRouter = require('./points');
const usersRouter = require('./users');
const mixedAuth = require('../middlewares/auth/mixed.auth');
const globalError = require('../middlewares/errors/global.error');

router.use('/locations/api/v1/points', mixedAuth, pointsRouter);
router.use('/locations/api/v1/users', usersRouter);

router.use('*', globalError);

module.exports = router;