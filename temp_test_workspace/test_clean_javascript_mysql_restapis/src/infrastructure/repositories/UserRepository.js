const UserModel = require('../database/models/User');

class UserRepository {
  async save(user) {
    const newUser = await UserModel.create({ name: user.name, email: user.email });
    return { ...user, id: newUser.id };
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
