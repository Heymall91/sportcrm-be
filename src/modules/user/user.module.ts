import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { Hash } from 'src/shared/helpers/hash';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...userProviders, Hash],
  exports: [UserService],
})
export class UserModule {}
