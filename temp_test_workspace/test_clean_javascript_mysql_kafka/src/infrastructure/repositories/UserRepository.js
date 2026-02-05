const UserModel = require('../database/models/User');

class UserRepository {
  async createUser(name, email) {
    const user = await UserModel.create({ name, email });
    return { id: user.id, name: user.name, email: user.email };
  }

  async getUsers() {
    const users = await UserModel.findAll();
    return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
    }));
  }
}

module.exports = UserRepository;
