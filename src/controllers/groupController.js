const { StatusCodes } = require('http-status-codes');
const GroupService = require('../services/groupService');

const groupService = new GroupService();

const addUsersToGroup = async(req, res) => {
    await groupService.addUsersToGroup(req.body.groupId, req.body.userIds);
    res.sendStatus(StatusCodes.NO_CONTENT);
};

const getAll = async (req, res) => res.json(await groupService.getAll());

const getById = async (req, res) => {
    const id = req.params.id;
    const grouup = await groupService.getById(id);

    return res.json(grouup);
};

const add = async (req, res) => {
    const grouup = req.body;

    await groupService.add(grouup)

    return res.sendStatus(StatusCodes.CREATED);
};

const update = async (req, res) => {
    const id = req.params.id;
    const grouup = req.body;

    await groupService.update(id, grouup);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

const remove = async (req, res) => {
    const id = req.params.id;

    await groupService.delete(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = { getAll, getById, add, update, remove, addUsersToGroup };
