import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

const cfg = dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim() || 'dev'}`,
}).parsed;

export default registerAs('auth', () => ({
  jwt_secret: cfg.JWT_SECRET,
}));
