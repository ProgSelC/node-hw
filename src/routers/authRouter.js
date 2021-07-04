const express = require('express');

const promiseErrorWrapper = require('../middleware/promiseErrorWrapper');
const { getToken } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/').post(promiseErrorWrapper(getToken));

module.exports = authRouter;
