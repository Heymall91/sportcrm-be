import * as dotenv from 'dotenv'
dotenv.config();

import * as path from 'path';

import { Module } from '@nestjs/common';
import Joi from 'joi';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { ClubStaffModule } from './modules/club-staff/club-staff.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import dataBaseConfig from './config/database.config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';


@Module(
  {
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [dataBaseConfig],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().optional()
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'mysql'>('database.type'),
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: false
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(process.cwd(), 'src', 'shared', 'i18n'),
        watch: true
      },
      resolvers: [
        AcceptLanguageResolver
      ]
    }),
    UsersModule,
    ClubsModule,
    ClubStaffModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
