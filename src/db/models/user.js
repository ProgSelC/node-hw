import { v4 as uuid } from 'uuid';

export default class User {
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
