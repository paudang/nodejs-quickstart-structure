import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypes } from './user.types';

export const typeDefs = mergeTypeDefs([userTypes]);
