const router = require('express').Router();
const dataValidation = require('../../middlewares/validators/joi.validator');
const { postPoint } = require('./points.controller');
const { postPointSchema } = require('./points.validator');

router.post('/', dataValidation(postPointSchema), postPoint);

module.exports = router;