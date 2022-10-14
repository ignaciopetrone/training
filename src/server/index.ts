import express from "express";
import { ApolloServer } from "apollo-server-express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import mongoose from "mongoose";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import {
  APP_PORT,
  IS_DEVELOPMENT,
  REDIS_OPTIONS,
  SESSION_OPTIONS,
  MONGO_URI,
  MONGO_OPTIONS,
} from "../../config";

(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = new Redis(REDIS_OPTIONS);

    app.disable("x-powered-by");

    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        ...SESSION_OPTIONS,
      })
    );
    redisClient.on("error", console.error);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res }),
      playground: IS_DEVELOPMENT,
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () =>
      console.log(
        `Server ready at http://localhost:${APP_PORT}${server.graphqlPath} 🚀🚀🚀`
      )
    );
  } catch (err) {
    console.error("Erroraso: ", err);
  }
})();
