const User = require('../../../models/user');

const createUser = async (user) => {
    return User.create(user);
};

const findByEmail = (email) => {
    return User.findOne({ email }).lean().exec();
};

module.exports = {
    createUser,
    findByEmail,
};