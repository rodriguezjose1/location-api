const { cloneDeep } = require("lodash");
const { getJoiError } = require("./joi.keys.errors");

const defaultError = (message) => ({ code: -1, message });

const customKeys = {
    'number.min': ['limit'],
    'number.max': ['limit'],
};

const handle = (detail, messages = {}) => {
    const context = detail.context;

    const customError = cloneDeep(getJoiError(detail.type, context) || defaultError(detail.message));

    customError.field = context.label;
    // customError.value = context.value;

    const keys = customKeys[detail.type];
    if (keys && keys.length) keys.forEach((key) => customError[key] = context[key]);

    const label = context.label.replace( /\d+/g, '*');
    const customMessage = messages[label];
    if (customMessage) customError.message = customMessage(context);

    return customError;
};

module.exports = {
    handle,
}