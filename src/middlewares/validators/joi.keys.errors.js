const errorTypes = {
    INVALID_TYPE: {
        code: 3,
        type: 'INVALID_TYPE',
    },
    EMPTY_NOT_ALLOWED: {
        code: 4,
        type: 'EMPTY_NOT_ALLOWED',
    },
    INVALID_FORMAT: {
        code: 5,
        type: 'INVALID_FORMAT',
    },
    INVALID_RANGE: {
        code: 6,
        type: 'INVALID_RANGE',
    },
    REQUIRED_FIELD: {
        code: 7,
        type: 'REQUIRED_FIELD',
    },
    FIELD_NOT_ALLOWED: {
        code: 8,
        type: 'FIELD_NOT_ALLOWED',
    },
};

const joiErrors = {
    // string
    'string.base': ({ label }) => ({
        ...errorTypes.INVALID_TYPE,
        message: `'${label}' is not string`,
    }),
    'string.empty': ({ label }) => ({
        ...errorTypes.EMPTY_NOT_ALLOWED,
        message: `'${label}' cannot be empty`,
    }),
    'string.pattern.base': ({ label }) => ({
        ...errorTypes.INVALID_FORMAT,
        message: `'${label}' does not correspond to the expected format`,
    }),
    //number
    'number.base': ({ label }) => ({
        ...errorTypes.INVALID_TYPE,
        message:`'${label}' is not number`,
    }),
    'number.min': ({ label, limit }) => ({
        ...errorTypes.INVALID_RANGE,
        message: `'${label}' should be less than ${limit}`,
    }),
    'number.max': ({ label, limit }) => ({
        ...errorTypes.INVALID_RANGE,
        message: `'${label}' should be greater than ${limit}`,
    }),
    // object
    'object.base': ({ label }) => ({
        ...errorTypes.INVALID_TYPE,
        message: `'${label}' should be an object`,
    }),
    // array
    'array.base': ({ label }) => ({
        ...errorTypes.INVALID_TYPE,
        message: `'${label}' should be an array`,
    }),
    // others
    'any.required': ({ label }) => ({
        ...errorTypes.REQUIRED_FIELD,
        message: `'${label}' is required`,
    }),
    'object.unknown': ({ label }) => ({
        ...errorTypes.FIELD_NOT_ALLOWED,
        message: `'${label}' is not allowed`,
    }),
    'date.base': ({ label }) => ({
        ...errorTypes.INVALID_TYPE,
        message: `'${label}' is not date`,
    }),
};

const getJoiError = (key, context) => {
    const joiError = joiErrors[key];
    if (!joiError) return null;

    return joiError(context);
};

module.exports = {
    getJoiError
};