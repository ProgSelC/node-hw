const { StatusCodes } = require('http-status-codes');
const users = require('../services/userService.js');

const getAll = async (req, res) => res.json(await users.getAll());

const getById = async (req, res) => {
    const id = req.params.id;
    const user = await users.getById(id);

    return res.json(user);
};

const create = async (req, res) => {
    const data = req.body;

    await users.create(data)

    return res.sendStatus(StatusCodes.CREATED);
};

const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    await users.update(id, data);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const setDeleted = async (req, res) => {
    const id = req.params.id;

    await users.setDeleted(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const getAutoSuggestions = async (req, res) => {
    const { loginSubstring, limit } = req.query;

    const suggestions = await users.getAutoSuggestions(loginSubstring, limit);

    return res.json(suggestions);
};

module.exports = { getAll, getById, create, update, setDeleted, getAutoSuggestions };
