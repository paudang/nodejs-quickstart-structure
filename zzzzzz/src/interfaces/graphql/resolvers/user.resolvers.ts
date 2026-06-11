import { UserController } from '@/interfaces/controllers/userController';
import { MyContext } from '@/interfaces/graphql/context';

const userController = new UserController();

export const userResolvers = {
  Query: {
    getAllUsers: async (_: unknown, __: unknown, _context: MyContext) => {
      const users = await userController.getUsers();
      return users;
    }
  },
  Mutation: {
    createUser: async (_: unknown, { name, email }: { name: string, email: string }) => {
      const user = await userController.createUser({ name, email });
      return user;
    },
    updateUser: async (_: unknown, { id, name, email }: { id: string, name?: string, email?: string }, _context: MyContext) => {
      const user = await userController.updateUser(id, { name, email });
      return user;
    },
    deleteUser: async (_: unknown, { id }: { id: string },_context: MyContext) => {
      const result = await userController.deleteUser(id);
      return result;
    }
  }};
