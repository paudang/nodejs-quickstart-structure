const CreateUser = require('../../usecases/CreateUser');
const GetAllUsers = require('../../usecases/GetAllUsers');
const UserRepository = require('../../infrastructure/repositories/UserRepository');
const HTTP_STATUS = require('../../utils/httpCodes');

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.createUserUseCase = new CreateUser(this.userRepository);
        this.getAllUsersUseCase = new GetAllUsers(this.userRepository);
    }

    getUsers(req, res) {
        this.getAllUsersUseCase.execute()
            .then(users => res.json(users))
            .catch(err => res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: err.message }));
    }

    async createUser(req, res) {
        const { name, email } = req.body;
        try {
            const user = await this.createUserUseCase.execute(name, email);
            res.status(HTTP_STATUS.CREATED).json(user);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = UserController;
