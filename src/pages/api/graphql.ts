import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { typeDefs } from "./typeDefs";
import { createPubSub, createYoga } from "graphql-yoga";

// Create a Neo4j driver instance to connect to Neo4j AuraDB
const neo4jUri = process.env.NEXT_PRIVATE_NEO4J_URI || "";
const neo4jUser = process.env.NEXT_PUBLIC_NEO4J_USER || "";
const neo4jPassword = process.env.NEXT_PRIVATE_NEO4J_PASSWORD || "";

const driver = neo4j.driver(
  neo4jUri,
  neo4j.auth.basic(neo4jUser, neo4jPassword)
);

// Type definitions and a Neo4j driver instance are all that's required for
// building a GraphQL API with the Neo4j GraphQL Library - no resolvers!
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  features: {
    subscriptions: true,
  },
});

// enum NotificationType {
//   "LIKE",
//   "COMMENT",
//   "FOLLOW",
//   "REPLY",
// }

// const pubSub = createPubSub<{
//   newNotification: [
//     payload: {
//       id: string;
//       type: NotificationType;
//       message: string;
//       createdAt: Date;
//     }
//   ];
// }>();

// const resolvers = {
//   Subscription: {
//     newNotification: {
//       subscribe: () => null,
//       resolve: (payload: any) => payload,
//     },
//   },
// };

// Building the Neo4j GraphQL schema is an async process
const initServer = async () => {
  console.log("Building GraphQL server");
  return await neoSchema.getSchema();
};

// Note the use of the top-level await here in the call to initServer()
export default createYoga({
  schema: await initServer(),
  graphqlEndpoint: "/api/graphql",
  // context: (req) => ({ req, pubSub }),
});
