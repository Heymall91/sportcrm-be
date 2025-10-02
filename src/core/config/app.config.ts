import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

const cfg = dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim() || 'dev'}`,
}).parsed;

export default registerAs('app', () => ({
  port: cfg.APP_PORT || 3000,
}));
