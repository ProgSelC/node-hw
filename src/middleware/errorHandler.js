const { StatusCodes } = require('http-status-codes');

const handler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        console.error(err.stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    next();
};

module.exports = handler;
