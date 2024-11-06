import { web2Resolvers } from '../resolvers/web2Resolvers';
import { web3Resolvers } from '../resolvers/web3Resolvers';

//this is for merging the resolvers
export const resolvers = {
  Query: {
    ...web2Resolvers.Query,
    ...web3Resolvers.Query
  },
  Mutation: {
    ...web2Resolvers.Mutation,
    ...web3Resolvers.Mutation
  }
};