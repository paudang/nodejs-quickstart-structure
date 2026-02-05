import { User } from '../domain/user';

export default (userRepository: any) => {
    return async (name: string, email: string) => {
        const user = new User(null, name, email);
        return userRepository.save(user);
    };
};
