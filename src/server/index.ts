import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import config from '../../config';
import typeDefs from './typedefs'
import resolvers from './resolvers'

const {
  isDevelopment,
  server: { port },
  DB_USERNAME, DB_PASSWORD, DB_NAME
} = config;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: isDevelopment
});

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@chat.ljinp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  
    const app = express();
    app.disable('x-powered-by')
    
    server.applyMiddleware({ app });
    
    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath} 🚀🚀🚀`)
    );

  } catch (err) {
    console.error(err);
    
  }
  
})()