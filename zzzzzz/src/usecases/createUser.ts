import { User } from '@/domain/user';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import cacheService from '@/infrastructure/caching/redisClient';
import logger from '@/infrastructure/log/logger';

export default class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(name: string, email: string, password?: string) {
        const user = new User(null, name, email, password);
        const savedUser = await this.userRepository.save(user);

        try {
            await cacheService.del('users:all');
            logger.info('Invalidated users:all cache');
        } catch (error) {
            logger.error('Cache error (del):', error);
        }

        return savedUser;
    }
}
