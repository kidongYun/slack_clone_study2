import { GraphQLServer } from "graphql-yoga"

const typeDefs = `
    type Query {
        sayHello : String!
    }
`;

const resolvers = {
    Query : {
        sayHello: () => "Hi there :0)"
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('My first GraphQL Server is running on localhost:4000'))