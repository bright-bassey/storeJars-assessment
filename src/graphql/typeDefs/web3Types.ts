import { gql } from 'apollo-server-express';

export const web3TypeDefs = gql`
    type StorageData {
        value: String!
    }

    extend type Query {
        getStorageValue: StorageData!
    }

    extend type Mutation {
        setStorageValue(value: String!): StorageData!
    }
`;