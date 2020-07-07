import dotenv from 'dotenv';

dotenv.config();

const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  server: {
    port: process.env.PORT,  
  },
  DB_USERNAME: 'admin',
  DB_PASSWORD: 'TotallySecret',
  DB_NAME: 'chat',
}

export default config;
