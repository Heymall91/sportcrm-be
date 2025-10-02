import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

const cfg = dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim() || 'dev'}`,
}).parsed;

export default registerAs('db', () => ({
  host: cfg.DB_HOST,
  port: cfg.DB_PORT,
  username: cfg.DB_USERNAME,
  password: cfg.DB_PASSWORD,
  name: cfg.DB_NAME,
}));
