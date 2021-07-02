const { Op } = require('sequelize');

class UserRepository {
    constructor(model) { 
        this.model = model;
    }

    async getById(id) {
        const user = await this.model.findByPk(id);
        return user;
    }

    async getAll() {
        const users = await this.model.findAll({
            where: { isDeleted: false }
        });
        return users;
    }

    create(user) {
        return this.model.create(user);
    }

    update(id, user) {
        return this.model.update(user, {
            where: { id }
        });
    }

    delete(id) {
        return this.model.update(
            { isDeleted: true },
            {
                where: { id }
            }
        );
    }

    async getAutoSuggestions(loginSubstring, limit) {
        const users = await this.model.findAll({
            where: {
                login: { [Op.iLike]: `${loginSubstring}%` },
                isDeleted: false
            },
            order: [['login', 'ASC']],
            limit
        });
        return users;
    }
}

module.exports = UserRepository;
