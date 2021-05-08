const { StatusCodes } = require('http-status-codes');

const validator = (schema) => {
    return (req, res, next) => {
        const options = { abortEarly: false };
        const { error } = schema.validate(req.body, options);

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            res.status(StatusCodes.BAD_REQUEST).json({ error: message })

        } else {
            return next();
        }
    }
}

module.exports = validator;
