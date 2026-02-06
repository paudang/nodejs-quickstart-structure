import { UserRepository } from '../infrastructure/repositories/UserRepository';

export default class GetAllUsers {
    constructor(private userRepository: UserRepository) {}

    async execute() {
        return this.userRepository.getUsers();
    }
}

