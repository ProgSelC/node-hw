import User from './models/user';

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

    if (user) {
        user.setDeleted();
    } else {
        return false;
    }

    return true;
};

export { getAll, getById, create, update, setDeleted };
