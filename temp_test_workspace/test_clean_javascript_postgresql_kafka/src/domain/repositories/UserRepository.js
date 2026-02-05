class UserRepository {
    async save(user) {
        // Database logic would go here
        user.id = Math.floor(Math.random() * 1000);
        return user;
    }
}

module.exports = UserRepository;
