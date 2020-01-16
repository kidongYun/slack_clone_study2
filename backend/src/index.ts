import { GraphQLServer } from "graphql-yoga"

/**
 * GraphQLServer를 동작시키기 위해서는 type, resolvers 2가지의 정보가 필요함.
 */

/** type 생성 */
const typeDefs = `
    type Query {
        sayHello : String!
    }
`;

/** resolvers 생성 */
const resolvers = {
    Query : {
        sayHello: () => "Hi there :0)"
    }
}; 