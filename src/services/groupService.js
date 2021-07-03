
const GroupRepository = require('../data-access/groupRepository');
const { GroupModel } = require('../models');
const { UserGroupModel } = require('../models');

class GroupService {
    constructor() {
        this.groupRepository = new GroupRepository(GroupModel, UserGroupModel);
    }

    async add(group) {
        group.isDeleted = false;
        const newgroup = await this.groupRepository.create(group);
        return newgroup.id;
    }

    async update(id, updatedgroup) {
        const res = await this.groupRepository.update(id, updatedgroup);
        return res;
    }

    async delete(id) {
        return await this.groupRepository.delete(id);
    }

    async getAll() {
        return await this.groupRepository.getAll();
    }

    async getById(id) {
        return await this.groupRepository.getById(id);
    }

    async addUsersToGroup(groupId, userIds) {
        return await this.groupRepository.addUsersToGroup(groupId, userIds);
    }
}

module.exports = GroupService;
