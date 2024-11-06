import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { connectDB } from './config/databaseConfig';
import { web2TypeDefs } from './graphql/typeDefs/web2Types';
import { web3TypeDefs } from './graphql/typeDefs/web3Types';
import { web2Resolvers } from './graphql/resolvers/web2Resolvers';
import { web3Resolvers } from './graphql/resolvers/web3Resolvers';

/**
 * This is the main server initialization function
 * It is also where the  Express, Apollo Server, and database connection are made
 * @returns {Promise<void>}
 */
const startServer = async () => {
    //this initializes the Express application
    const app = express();
    
    /**
     * this initializes the MongoDB connection and throws an error if it fails
     */
    try {
        await connectDB();
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
    
    /**
     * this creates the GraphQL schema by combining the Web2 and Web3 schemas
     * @typeDefs - this refers to the GraphQL type definitions for Web2 (MongoDB) and Web3 (Smart Contract) operations
     * @resolvers - this refers to the Resolver functions that handle the actual data fetching/mutation logic
     */
    const schema = makeExecutableSchema({
        typeDefs: [web2TypeDefs, web3TypeDefs],
        resolvers: [web2Resolvers, web3Resolvers]
    });
    
    /**
     * this initializes the Apollo Server with the schema and context
     * @context - Provides request object to resolvers for auth/session management
     */
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ 
            req
           
        })
    });
    
    // this starts the Apollo Server
    await server.start();

    /**
     * This applies the Apollo middleware to the Express application and creates the /graphql endpoint for GraphQL operations
     */
    server.applyMiddleware({ app });
    
    // this gets the port from the environment variables or uses 4000 as the default port
    const PORT = process.env.PORT || 4000;

    /**
     * this starts the Express server and provides the GraphQL endpoint at http://localhost:PORT/graphql
     */
    app.listen(PORT, () => {
        console.log(`
        🚀 Server is running!
        📊 GraphQL Playground: http://localhost:${PORT}${server.graphqlPath}
        🔧 Environment: ${process.env.NODE_ENV || 'development'}
        `);
    });
};

/**
 * this is the error handling for server startup
 */
startServer().catch((error) => {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
});

/**
 * this ensures proper cleanup when the server is terminated
 */
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Performing graceful shutdown...');
    process.exit(0);
});