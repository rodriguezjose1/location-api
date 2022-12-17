const KnownException = ({ status, error, errors }) => {
    const exeception =  {
        status,
        known: true,
    };

    if (error) {
        exeception.code = error.code;
        exeception.message = error.message;
    } else {
        exeception.errors = errors;
    }

    return exeception;
};

module.exports = KnownException;