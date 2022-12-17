const { invalidToken, requiredToken } = require('../../common/errors/global.errors');
const { KnownException } = require('../../common/exceptions');
const { verifyToken } = require('../../routes/users/users.utils');

const tokenAuth = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) throw KnownException(requiredToken);

    if (!token.includes('Bearer')) throw KnownException(invalidToken);
    token = token.replace('Bearer ', '');

    const user = verifyToken(token);
    if (!user) throw KnownException(invalidToken);
    req.user = user;

    next();
};

module.exports = tokenAuth;