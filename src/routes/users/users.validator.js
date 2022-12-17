const Joi = require('joi');

const postRegisterSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string(),
        email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    }).unknown(true),
    messages: {
        email: ({ label }) => `'${label}' should have the following format example@email.com`,
        password: ({ label }) => `'${label}' requires at least 8 characters, 1 uppercase, 1 lowercase and 1 number`
    }
}

module.exports = {
    postRegisterSchema
};