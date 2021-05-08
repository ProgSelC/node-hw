const { StatusCodes } = require('http-status-codes');
const users = require('../services/userService.js');

const getAll = (req, res) => res.json(users.getAll());

const getById = (req, res) => {
    const id = req.params.id;
    const userList = users.getById(id);

    return res.json(userList);
};

const create = (req, res) => {
    const data = req.body;

    return res.status(StatusCodes.CREATED).json(users.create(data));
};

const update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    return res.json(users.update(id, data));
};

const setDeleted = (req, res) => {
    const id = req.params.id;

    users.setDeleted(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const getAutoSuggestions = (req, res) => {
    const { loginSubstring, limit } = req.query;

    return res.json(users.getAutoSuggestions(loginSubstring, limit));
};

module.exports = { getAll, getById, create, update, setDeleted, getAutoSuggestions };
