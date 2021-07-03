const UserRepository = require('../data-access/userRepository');
const UserModel = require('../models/userModel');

class UserService {
    constructor() {
        this.userRepository = new UserRepository(UserModel);
    }

    async add(user) {
        user.isDeleted = false;
        const newUser = await this.userRepository.create(user);
        return newUser.id;
    }

    async update(id, updatedUser) {
        const res = await this.userRepository.update(id, updatedUser);
        return res;
    }

    async delete(id) {
        return await this.userRepository.delete(id);
    }

    async get(id) {
        if (id) {
            return await this.userRepository.getById(id);
        }

        return await this.userRepository.getAll();
    }

    async getAutoSuggestions(loginSubstring, limit) {
        return await this.userRepository.getAutoSuggestions(loginSubstring, limit);
    }
}

module.exports = UserService;
