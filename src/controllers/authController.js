const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/userService');
const config = require('../config/authConfig');

const userService = new UserService();

module.exports = {
    getToken: async (req, res) => {
        const user = await userService.getUserByCredentials(req.body.login, req.body.password);
        if (user) {
            const result = {
                id: user.id,
                login: user.login,
                age: user.age,
                groups: user.groups
            };
            res.status(StatusCodes.OK).send({
                ...result,
                token: jwt.sign(result, config.SECRET, { expiresIn: 3600 })
            });
        } else {
            res.status(StatusCodes.FORBIDDEN).send(`Wrong username or password`);
        }
    }
};
