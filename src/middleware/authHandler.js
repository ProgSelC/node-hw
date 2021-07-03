const logger = require('../config/logger');
const jwt = require('jsonwebtoken');

const config = require('../config/authConfig');
const { StatusCodes } = require('http-status-codes');

const handler = (req, res, next) => {
    const token = req.headers[config.TOKEN_HEADER];
    if (token) {
        jwt.verify(token, config.SECRET, (err) => {
            if (err) {
                logger.error(`FORBIDDEN: bad token`);
                res.status(StatusCodes.FORBIDDEN).end('Toke validation failed');
            } else {
                return next();
            }
        });
    } else {
        logger.error(`FORBIDDEN: no toke found`);
        res.status(StatusCodes.FORBIDDEN).end('No token provided');
    }
};

module.exports = handler;
