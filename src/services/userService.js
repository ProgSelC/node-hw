const User = require('./models/user');
const { filterWithLimit } = require('../utils/arrayUtils');


const users = [];

const getAll = () => users.filter(u => !u.isDeleted);

const getById = (id) => users.find(u => u.id === id);

const create = (data) => {
    const user = new User(data);

    users.push(user);

    return user;
};

const update = (id, data) => {
    const user = getById(id);
    if (user) {
        user.update(data);
    }
    
    return user;
};

const setDeleted = (id) => {
    const user = getById(id);

    if (user) user.setDeleted();
};

const getAutoSuggestions = (loginSubstring, limit) => {
    const logins = getAll()
        .map(u => u.login);

    const predicate = (login) => login.toUpperCase().startsWith(loginSubstring.toUpperCase());

    return filterWithLimit(logins, predicate, limit)
        .sort((a, b) => a.localeCompare(b));
}

module.exports = { getAll, getById, create, update, setDeleted, getAutoSuggestions };
