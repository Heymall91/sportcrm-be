import * as dotenv from 'dotenv';
let cfg = dotenv.config({ path:  `.env.${process.env.NODE_ENV || 'dev'}` }).parsed;

module.exports = {
  development: {
     dialect: "mysql",
     host: cfg.DB_HOST,
     port: cfg.DB_PORT,
     username: cfg.DB_USERNAME,
     password: cfg.DB_PASSWORD,
     database: cfg.DB_NAME,
  },
  test: {
     dialect: "mysql",
     host: cfg.DB_HOST,
     port: cfg.DB_PORT,
     username: cfg.DB_USERNAME,
     password: cfg.DB_PASSWORD,
     database: cfg.DB_NAME,
  },
  production: {
     dialect: "mysql",
     host: cfg.DB_HOST,
     port: cfg.DB_PORT,
     username: cfg.DB_USERNAME,
     password: cfg.DB_PASSWORD,
     database: cfg.DB_NAME,
  },
}