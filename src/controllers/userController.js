const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/userService');

const userService = new UserService();

const getAll = async (req, res) => res.json(await userService.get());

const getById = async (req, res) => {
    const id = req.params.id;
    const user = await userService.get(id);

    return res.json(user);
};

const create = async (req, res) => {
    const user = req.body;

    await userService.add(user)

    return res.sendStatus(StatusCodes.CREATED);
};

const update = async (req, res) => {
    const id = req.params.id;
    const user = req.body;

    await userService.update(id, user);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const setDeleted = async (req, res) => {
    const id = req.params.id;

    await userService.delete(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const getAutoSuggestions = async (req, res) => {
    const { loginSubstring, limit } = req.query;

    const suggestions = await userService.getAutoSuggestions(loginSubstring, limit);

    return res.json(suggestions);
};

module.exports = { getAll, getById, create, update, setDeleted, getAutoSuggestions };
