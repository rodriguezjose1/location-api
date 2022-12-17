const { KnownException } = require('../../common/exceptions');
const { handle } = require('./joi.handler.errors');

const addErrors = (errors = [], error, messages) => {
    const details = error.details;

    details.forEach((detail) => {
        const customError = handle(detail, messages);
        errors.push(customError);
    });

    return errors;
};

const dataValidation = (schema) => {
    return (req, res, next) => {
        try {
            const { messages, ...schemaData } = schema;
            const keys = Object.keys(schemaData);
            const errors = [];

            keys.forEach((key) => {
                const { error } = schema[key].validate(req[key], { abortEarly: false });
                if (error) addErrors(errors, error, messages);
            });

            if (errors.length) throw KnownException({ status: 400, errors });

            next();
        } catch (error) {
            next(error);
        }
    }
}
module.exports = dataValidation;