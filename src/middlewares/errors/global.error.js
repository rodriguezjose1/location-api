const globalError = (err, req, res, next) => {
    console.log(err);

    let errors = [];
    if (err.errors) {
        errors = err.errors;
    } else {
        errors.push({
            code: err.code,
            error: err.message
        });
    }

    if (err.known)
        res.status(err.status).json({
            success: false,
            errors
        });
    else
        res.status(500).json({ success: false, code: 0, error: 'INTERNAL_SERVER_ERROR' });
};

module.exports = globalError;