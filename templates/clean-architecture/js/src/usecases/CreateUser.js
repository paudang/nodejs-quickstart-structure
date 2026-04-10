const User = require('../domain/models/User');

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(name, email, password) {
        const user = new User(null, name, email, password);
        return await this.userRepository.save(user);
    }

}

module.exports = CreateUser;
