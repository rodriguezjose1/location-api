const User = require('../../../models/User');

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