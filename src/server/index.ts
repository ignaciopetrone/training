import express from 'express';
import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import uuid from 'uuid';

type Db = {
  users: User[]
  messages: Message[]
}

type User = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

type Message = {
  id: string
  userId: string
  body: string
  createdAt: number
}

const db: Db = {
  users: [
    { id: '1', name: 'Alex', email: 'alex@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '2', name: 'Marcus', email: 'marcus@gmail.com', avatarUrl: 'https://gravatar.com/123' },
    { id: '3', name: 'Maria', email: 'maria@gmail.com', avatarUrl: 'https://gravatar.com/123' },
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hello culiauuu', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'pero vevo wachen', createdAt: Date.now() },
  ]
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    userId: 
    body: String
    createdAt: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    users: () => db.users,
    user: (_obj: unknown, args: {id: string}) => db.users.find(user => user.id === args.id),
    messages: () => db.messages
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
  },
  User: {
    messages: (_obj: User) => db.messages.filter(message => message.userId === _obj.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath} 🚀🚀🚀`)
);