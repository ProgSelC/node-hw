import * as users from '../db/users';
import { filterWithLimit } from '../utils/arrayUtils';

const getAll = (req, res) => res.json(users.getAll());

const getById = (req, res) => {
    const id = req.params.id;
    const userList = users.getById(id);

    return res.json(userList);
};

const create = (req, res) => {
    const data = req.body;

    return res.json(users.create(data));
};

const update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    return res.json(users.update(id, data));
};

const setDeleted = (req, res) => {
    const id = req.params.id;

    return res.json(users.setDeleted(id));
};

const getAutoSuggestions = (req, res) => {
    const { loginSubstring, limit } = req.query;

    const logins = users.getAll()
        .map(u => u.login);

    const predicate = (login) => login.toUpperCase().startsWith(loginSubstring.toUpperCase());

    const results = filterWithLimit(logins, predicate, limit)
        .sort((a, b) => a.localeCompare(b));

    return res.json(results);
};

export { getAll, getById, create, update, setDeleted, getAutoSuggestions };
