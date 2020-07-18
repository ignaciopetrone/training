import dotenv from 'dotenv';
import { ConnectionOptions } from 'mongoose';
import { RedisOptions } from 'ioredis';
import { SessionOptions } from 'express-session';

const result = dotenv.config();
 
if (result.error) {
  throw result.error
}

export const {
  NODE_ENV,
  APP_PORT,
  
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_NAME,
  
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFETIME,
  
  REDISS_HOST,
  REDISS_PORT,
  REDISS_PASSWORD
} = result.parsed;


export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

export const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@chat.ljinp.mongodb.net/${MONGO_NAME}?retryWrites=true&w=majority`;
export const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// const REDIS_HOST = "redis-13759.c78.eu-west-1-2.ec2.cloud.redislabs.com"; // Redis does not read it coming from .env
export const REDIS_OPTIONS: RedisOptions = {
  port: Number(REDISS_PORT),
  host: REDISS_HOST,
  password: REDISS_PASSWORD
}

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: Number(SESSION_LIFETIME),
    secure: !IS_DEVELOPMENT,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: true
}