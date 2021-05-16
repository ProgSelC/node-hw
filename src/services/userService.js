const { filterWithLimit } = require('../utils/arrayUtils');
const users = require('../data-access/db');

const getAll = () => users.getAll();

const getById = (id) => users.getById(id);

const create = (data) => {
    users.create(data);
};

const update = (id, data) => users.update(id, data);

const setDeleted = (id) => users.update(id, { isDeleted: true });

const getAutoSuggestions = async (loginSubstring, limit) => {
    const logins = (await users.getAllLogins()).map(u => u.login);

    const predicate = (login) => login.toUpperCase().startsWith(loginSubstring.toUpperCase());

    return filterWithLimit(logins, predicate, limit)
        .sort((a, b) => a.localeCompare(b));
}

module.exports = { getAll, getById, create, update, setDeleted, getAutoSuggestions };
