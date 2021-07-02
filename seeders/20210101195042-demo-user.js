const uuid = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
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
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: uuid.v4(),
                    login: 'Anna',
                    password: 'pass1',
                    age: 22,
                    is_deleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Michal',
                    password: 'pass2',
                    age: 35,
                    is_deleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Alice',
                    password: 'pass3',
                    age: 27,
                    is_deleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Lisa',
                    password: 'pass4',
                    age: 34,
                    is_deleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Zoltan',
                    password: 'pass5',
                    age: 33,
                    is_deleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Margo',
                    password: 'pass6',
                    age: 35,
                    is_deleted: false
                }
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    }
};
