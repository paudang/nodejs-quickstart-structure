import { User } from '../../domain/user';

export class UserRepository {
    async save(user: User) {
        console.log('Saving user to DB:', user);
        // Implementation for DB (pg/mysql) would go here
        return { ...user, id: 123 };
    }
}
