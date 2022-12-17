// 1-100 reserved for global errors
const invalidToken = {
    status: 401,
    error: {
        code: 1,
        message: 'Invalid token',
    }
};

const requiredToken = {
    status: 400,
    error: {
        code: 2,
        message: 'Token is required',
    }
};

module.exports = {
    invalidToken,
    requiredToken
};