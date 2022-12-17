const usersDao = require('./users.dao');
const { hashPassword, validPassword, signToken, isValidPassword } = require('./users.utils');
const { KnownException } = require('../../common/exceptions');
const { existingMail, userNotFound, incorrectPassword, invalidPassword } = require('./users.errors');

const generateTokens = (id) => {
    const tokenAccess = signToken(id, 'access');
    const tokenRefresh = signToken(id, 'refresh');

    return { tokenAccess, tokenRefresh };

}

const postRegister = async (req, res, next) => {
    try {
        const { name, lastname, email, password } = req.body;

        const isEmailExist = await usersDao.findByEmail(email);
        if (isEmailExist) throw KnownException(existingMail);

        if (!isValidPassword(password)) throw KnownException(invalidPassword);

        const hashedPassword = await hashPassword(password);

        const user = await usersDao.createUser({
            name,
            email,
            lastname,
            password: hashedPassword
        });

        res.json({
            success: true,  
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

const postlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const user = await usersDao.findByEmail(email);
        if (!user) throw KnownException(userNotFound);
    
        const isValidPassword = await validPassword(password, user.password);
        if (!isValidPassword) throw KnownException(incorrectPassword);
    
        const { tokenAccess, tokenRefresh } = generateTokens(user._id);
    
        delete user.password;
        res.json({
            success: true,
            data: {
                user,
                access_token: tokenAccess,
                refresh_token: tokenRefresh,
            }
        });
    } catch (error) {
        next(error);
    }
};

const postRefresh = async (req, res, next) => {
    try {
        const { tokenAccess, tokenRefresh } = generateTokens(user._id);
    
        res.json({
            success: true,
            data: {
                user,
                access_token: tokenAccess,
                refresh_token: tokenRefresh,
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postRegister,
    postlogin,
    postRefresh
};