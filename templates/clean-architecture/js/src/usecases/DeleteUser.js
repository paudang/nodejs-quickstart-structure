class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    return this.userRepository.delete(id);
  }
}

module.exports = DeleteUser;
