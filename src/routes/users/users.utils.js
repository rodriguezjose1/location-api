const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

const validPassword = async (bodyPassword, userPassowrd) => {
    const validPassword = await bcrypt.compare(bodyPassword, userPassowrd);
    if (!validPassword) return false;

    return true;
};

const signToken = (id, type = 'access') => {
    const secret = type === 'access' ? process.env.TOKEN_SECRET : process.env.REFRESH_SECRET;
    const token = jwt.sign({ id }, secret, { expiresIn: '1h' });

    return token;
};

const verifyToken = (token, type = 'access') => {
    try {
        const secret = type === 'access' ? process.env.TOKEN_SECRET : process.env.REFRESH_SECRET;
        const userVerified = jwt.verify(token, secret);
        console.log(userVerified);
        return userVerified;
    } catch (error) {
        return null;
    }
};

const isValidPassword = (str) => {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(str);
}

module.exports = {
    hashPassword,
    validPassword,
    signToken,
    verifyToken,
    isValidPassword
}