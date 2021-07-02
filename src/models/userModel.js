const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const UserModel = Model.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            field: 'is_deleted',
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'user', timestamps: false }
);

module.exports = UserModel;
