const existingMail = {
    status: 409,
    error: {
        code: 101,
        message: 'Existing email',
    }
};

const userNotFound = {
    status: 400,
    error: {
        code: 102,
        message: 'User not found',
    }
};

const incorrectPassword = {
    status: 401,
    error: {
        code: 103,
        message: 'Incorrect password',
    }
};

const invalidPassword = {
    status: 400,
    error: {
        code: 104,
        message: 'Invalid password, the password requires at least 8 characters, 1 uppercase, 1 lowercase and 1 number',
    }
};


module.exports = {
    existingMail,
    userNotFound,
    incorrectPassword,
    invalidPassword,
};