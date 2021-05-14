const uuid = require('uuid').v4;

class User {
    constructor({ login, password, age }) {
        this.id = uuid();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }

    setDeleted() {
        this.isDeleted = true;
    }

    update({ login, password, age }) {
        this.login = login;
        this.password = password;
        this.age = age;
    }
}

module.exports = User;
