
export default (userRepository: any) => {
    return async () => {
        return userRepository.getUsers();
    };
};
