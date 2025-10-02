import { Module } from '@nestjs/common';

import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { ClubRepository } from './club.repository';
import { clubProviders } from './entities/club.entity';

@Module({
  controllers: [ClubController],
  providers: [ClubService, ClubRepository, ...clubProviders],
  exports: [ClubService],
})
export class ClubModule {}
