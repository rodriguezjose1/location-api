const Joi = require('joi');

const postPointSchema = {
    body: Joi.object({
        lat: Joi.number().required(),
        long: Joi.number().required(),
        timestamp: Joi.date().optional(),
    }).unknown(true),
}

module.exports = {
    postPointSchema
};