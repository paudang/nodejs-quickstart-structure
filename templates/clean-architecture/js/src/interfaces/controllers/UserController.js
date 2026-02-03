const CreateUser = require('../../usecases/CreateUser');
const UserRepository = require('../../domain/repositories/UserRepository');

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.createUserUseCase = new CreateUser(this.userRepository);
    }

    getUsers(req, res) {
        // Demo implementation
        res.json([
            { id: 1, name: 'John Doe' }
        ]);
    }

    async createUser(req, res) {
        const { name, email } = req.body;
        try {
            const user = await this.createUserUseCase.execute(name, email);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
