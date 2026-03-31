class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    return this.userRepository.update(id, data);
  }
}

module.exports = UpdateUser;
