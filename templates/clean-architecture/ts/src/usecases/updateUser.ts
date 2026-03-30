import { UserRepository } from '@/infrastructure/repositories/UserRepository';

export default class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: number | string, data: { name?: string, email?: string }) {
        return this.userRepository.update(id, data);
    }
}
