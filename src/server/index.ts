import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const db = {
  users: [
    { id: '1', name: 'Alex', email: 'alex@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '2', name: 'Marcus', email: 'marcus@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '3', name: 'Maria', email: 'maria@gmail.com', avatarUrl: 'https://gravatar.com/123' },
  ]
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String
    avatarUrl: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: () => db.users,
  },
};


const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath} 🚀🚀🚀`)
);