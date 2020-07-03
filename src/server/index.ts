import express from 'express';
import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import uuid from 'uuid';

type Db = {
  users: User[]
}

type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

const db: Db = {
  users: [
    { id: '1', name: 'Alex', email: 'alex@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '2', name: 'Marcus', email: 'marcus@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '3', name: 'Maria', email: 'maria@gmail.com', avatarUrl: 'https://gravatar.com/123' },
  ]
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    getUsers: () => db.users,
    getUser: (_obj: unknown, args: {id: string}) => db.users.find(user => user.id === args.id)
  },
  Mutation: {
    addUser: (_obj: unknown, args: {name: string; email: string}) => {
      const user = {
        id: uuid(),
        name: args.email,
        email: args.email
      }
      db.users.push(user);
      
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath} 🚀🚀🚀`)
);