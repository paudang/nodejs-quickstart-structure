import { Request } from 'express';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

export interface MyContext {
  userRepository: UserRepository;
  user?: unknown;
}

export const gqlContext = async ({ req: _req }: { req: Request }): Promise<MyContext> => {
  const userRepository = new UserRepository();
  const context: MyContext = { userRepository };

  return context;
};
