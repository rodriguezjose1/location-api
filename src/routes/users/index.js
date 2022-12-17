const router = require('express').Router();
const refreshAuth = require('../../middlewares/auth/refresh.auth');
const dataValidation = require('../../middlewares/validators/joi.validator');
const { postRegister, postlogin, postRefresh } = require('./users.controller');
const { postRegisterSchema } = require('./users.validator');

router.post('/register', dataValidation(postRegisterSchema), postRegister);
router.post('/login', postlogin);
router.post('/refresh', refreshAuth, postRefresh);

module.exports = router;