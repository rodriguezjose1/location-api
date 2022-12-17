const { invalidToken, requiredToken } = require("../../common/errors/global.errors");
const { KnownException } = require("../../common/exceptions");

const basicAuth = (req, res, next) => {
    let basicToken = req.headers.authorization;

    if (!basicToken) throw KnownException(requiredToken)

    if (!basicToken.includes('Basic')) throw KnownException(invalidToken);
    basicToken = basicToken.replace('Basic ', '');

    const decodedToken = Buffer.from(basicToken, 'base64').toString('utf-8');

    const splittedToken = decodedToken.split(':');
    if (splittedToken.length !== 2) throw KnownException(invalidToken);;
    const [user, password] = splittedToken;

    if (user !== process.env.API_USER && password !== process.env.API_PASSWORD)
        throw KnownException(invalidToken);;

    next();
}

module.exports = basicAuth;