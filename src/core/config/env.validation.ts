import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';

class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_SECRET: string;
}

export function validate() {
  const env_vars = dotenv.config({
    path: `.env.${process.env.NODE_ENV.trim() || 'dev'}`,
  }).parsed;

  const validatedConfig = plainToInstance(EnvironmentVariables, env_vars, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  console.log(`Your environment: ${process.env.NODE_ENV}`);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
