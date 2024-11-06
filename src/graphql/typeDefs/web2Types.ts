import { gql } from 'apollo-server-express';

export const web2TypeDefs = gql`
    type User {
        id: ID!
        address: String!
        username: String!
        createdAt: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(address: String!, username: String!): User!
    }
`;