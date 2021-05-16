const Sequelize = require('sequelize');
const { host, port, user, password, database } = require('../config/dbConfig');
const userModel = require('../models/user');
const initialUsers = require('../config/initialUsers.json');

// connect to db
const sequelize = new Sequelize(database, user, password, { host, port, dialect: 'postgres' });

// init models and add them to the exported db object
const User = sequelize.define('User', userModel);

// recreate table and populate it with sample data
User.sync({ force: true }).then(() => {
    User.bulkCreate(initialUsers, { validate: true }).then(() => {
        console.log('Users populated');
    }).catch((err) => {
        console.error(`Failed to populate Users: ${err}`);
    });
});

const db = {
    getAll: () => User.findAll({ where: { isDeleted: false }, attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] } }),
    getAllLogins: () => User.findAll({ where: { isDeleted: false }, attributes: ['login'] }),
    getById: (id) => User.findByPk(id, { attributes: { exclude: ['isDeleted', 'createdAt', 'updatedAt'] } }),
    create: (newUser) => User.create(newUser),
    update: (id, props) => User.update(props, { where: { id } }),
};

module.exports = db;
