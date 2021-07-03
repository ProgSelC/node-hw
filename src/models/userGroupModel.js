const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

class UserGroupModel extends Model {}
UserGroupModel.init(
    {
        userId: {
            field: 'user_id',
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        groupId: {
            field: 'group_id',
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'groups',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    },
    { sequelize, modelName: 'usergroups', timestamps: false }
);

module.exports = UserGroupModel;
