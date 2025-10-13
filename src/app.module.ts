import * as dotenv from 'dotenv'
dotenv.config()

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { ClubStaffModule } from './modules/club-staff/club-staff.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import dataBaseConfig from './config/database.config';


@Module(
  {
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `config/${process.env.NODE_ENV}.env`,
      load: [dataBaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    ClubsModule,
    ClubStaffModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
