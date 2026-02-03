import { User } from '../../domain/user';

export default class UserRepository {
    async save(user: User) {
        console.log('Saving user to DB:', user);
        // Implementation for DB (pg/mysql) would go here
        return { id: 123, ...user };
    }
}
