import { Module } from '@nestjs/common';

import { ClubStudentService } from './club-student.service';
import { ClubStudentController } from './club-student.controller';
import { ClubStudentRepository } from './club-student.repository';
import { clubStudentProviders } from './entities/club-student.entity';

@Module({
  controllers: [ClubStudentController],
  providers: [
    ClubStudentService,
    ClubStudentRepository,
    ...clubStudentProviders,
  ],
  exports: [ClubStudentService],
})
export class ClubStudentModule {}
