import { User } from '../domain/user';

export default class CreateUser {
    constructor(private userRepository: any) {}

    async execute(name: string, email: string) {
        const user = new User(null, name, email);
        return this.userRepository.save(user);
    }
}

