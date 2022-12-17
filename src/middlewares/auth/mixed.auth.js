const { invalidToken, requiredToken } = require('../../common/errors/global.errors');
const { KnownException } = require("../../common/exceptions");
const basicAuth = require("./basic.auth");
const tokenAuth = require("./token.auth");

const mixedAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) throw KnownException(requiredToken);

        const isJwt = token.includes('Bearer');
        const isBasic = token.includes('Basic');
    
        if (!isJwt && !isBasic) throw KnownException(invalidToken);

        if (isJwt) tokenAuth(req, res, next);
        if (isBasic) basicAuth(req, res, next);
    } catch (error) {
        next(error)
    }
};

module.exports = mixedAuth;