const logger = require('../config/logger');

const handle = (req, res, next) => {
    logger.info(`${req.method}: ${req.originalUrl}; body=${JSON.stringify(req.body)}`, {
        method: req.method,
        url: req.originalUrl,
        body: req.body
    });
    next();
};

module.exports = handle;
