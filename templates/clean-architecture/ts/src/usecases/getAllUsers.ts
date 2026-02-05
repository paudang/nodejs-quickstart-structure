export default class GetAllUsers {
    constructor(private userRepository: any) {}

    async execute() {
        return this.userRepository.getUsers();
    }
}

