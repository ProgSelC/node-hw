const { Op } = require('sequelize');

class UserRepository {
    constructor(model) { 
        this.model = model;
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async getAll() {
        return await this.model.findAll({
            where: { isDeleted: false }
        });
    }

    async create(user) {
        return await this.model.create(user);
    }

    async update(id, user) {
        return await this.model.update(user, {
            where: { id }
        });
    }

    async delete(id) {
        return await this.model.update(
            { isDeleted: true },
            {
                where: { id }
            }
        );
    }

    async getAutoSuggestions(loginSubstring, limit) {
        return await this.model.findAll({
            where: {
                login: { [Op.iLike]: `${loginSubstring}%` },
                isDeleted: false
            },
            order: [['login', 'ASC']],
            limit
        });
    }
}

module.exports = UserRepository;
