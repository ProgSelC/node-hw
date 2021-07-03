const { Sequelize } = require('sequelize');
const { database, user, password, options } = require('../config/dbConfig');

const sequelize = new Sequelize(database, user, password, options);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const close = () => sequelize.close();

module.exports = { sequelize, connect, close };
