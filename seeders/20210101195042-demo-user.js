const Permissions = require('../src/models/permissions');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('groups', {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            permissions: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING)
        });
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true
            },
            login: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                field: 'is_deleted',
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        });
        await queryInterface.createTable('usergroups', {
            userId: {
                field: 'user_id',
                type: Sequelize.DataTypes.UUID,
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
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            }
        });
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: 'da23d114-4756-419d-97a0-138ebef91713',
                    login: 'Anna',
                    password: 'pass1',
                    age: 22,
                    is_deleted: false
                },
                {
                    id: '2a800558-e5ae-4dd9-9a8f-84642091baa7',
                    login: 'Michal',
                    password: 'pass2',
                    age: 35,
                    is_deleted: false
                },
                {
                    id: 'eadff4ed-a325-44c1-b51a-21910d1dd5fe',
                    login: 'Alice',
                    password: 'pass3',
                    age: 27,
                    is_deleted: false
                },
                {
                    id: '84e86525-3bee-4c56-94ae-4b9d24d84024',
                    login: 'Lisa',
                    password: 'pass4',
                    age: 34,
                    is_deleted: false
                },
                {
                    id: '2faeb1d6-347a-466d-90af-0b85ead6c9df',
                    login: 'Zoltan',
                    password: 'pass5',
                    age: 33,
                    is_deleted: false
                },
                {
                    id: '2dd3946c-39c2-4e31-9d0c-2c9c7be21811',
                    login: 'Margo',
                    password: 'pass6',
                    age: 35,
                    is_deleted: false
                }
            ]
        );
        await queryInterface.bulkInsert('groups', [
            {
                id: '7915a69f-594d-4b3f-88a4-98a0df54522e',
                name: 'Admin',
                permissions: [Permissions.READ, Permissions.SHARE, Permissions.WRITE, Permissions.UPLOAD]
            },
            {
                id: 'dcc4db83-a96c-4f9e-b0a4-62bbac4361ba',
                name: 'Advanced',
                permissions: [Permissions.READ, Permissions.SHARE]
            },
            {
                id: '05d76658-55c6-46b9-8c42-c75bd744a8ca',
                name: 'Readonly',
                permissions: [Permissions.READ]
            }
        ]);
        await queryInterface.bulkInsert('usergroups', [
            {
                user_id: 'eadff4ed-a325-44c1-b51a-21910d1dd5fe',
                group_id: '7915a69f-594d-4b3f-88a4-98a0df54522e'
            },
            {
                user_id: 'da23d114-4756-419d-97a0-138ebef91713',
                group_id: 'dcc4db83-a96c-4f9e-b0a4-62bbac4361ba'
            },
            {
                user_id: '2a800558-e5ae-4dd9-9a8f-84642091baa7',
                group_id: 'dcc4db83-a96c-4f9e-b0a4-62bbac4361ba'
            },
            {
                user_id: '2faeb1d6-347a-466d-90af-0b85ead6c9df',
                group_id: '05d76658-55c6-46b9-8c42-c75bd744a8ca'
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('usergroups');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('groups');
    }
};
