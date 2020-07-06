import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config from '../../config';
import typeDefs from './typedefs'
import resolvers from './resolvers'

const {
  isDevelopment,
  server: { port },
} = config;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: isDevelopment
});

const app = express();
app.disable('x-powered-by')

server.applyMiddleware({ app });


app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath} 🚀🚀🚀`)
);