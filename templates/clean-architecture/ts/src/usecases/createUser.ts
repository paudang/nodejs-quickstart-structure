import { User } from '../domain/user';

import { UserRepository } from '../infrastructure/repositories/UserRepository';

export default class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, email: string) {
        const user = new User(null, name, email);
        return this.userRepository.save(user);
    }
}

