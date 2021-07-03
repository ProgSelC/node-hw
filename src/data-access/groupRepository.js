const { sequelize } = require('../data-access/connection');
const { UserModel } = require('../models');

const include = {
    model: UserModel,
    attributes: ['id', 'login'],
    through: {
        attributes: []
    }
};

class GroupRepository {
    constructor(groupModel, userGroupsModel) {
        this.groupModel = groupModel;
        this.userGroupsModel = userGroupsModel;
    }

    async getById(id) {
        return await this.groupModel.findByPk(id, { include });
    }

    async getAll() {
        return await this.groupModel.findAll({ include });
    }

    async create(group) {
        return await this.groupModel.create(group);
    }

    async update(id, group) {
        return await this.groupModel.update(group, {
            where: { id }
        });
    }

    async delete(id) {
        return await this.groupModel.destroy({ where: { id } });
    }

    async addUsersToGroup(groupId, userIds) {
        return await sequelize.transaction(async transactions => {
            const query = userIds.map(userId => ({ userId, groupId }));

            await this.userGroupsModel.bulkCreate(query, transactions);
        });
    }
}

module.exports = GroupRepository;
