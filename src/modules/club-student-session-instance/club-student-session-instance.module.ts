import { Module } from '@nestjs/common';

import { ClubStudentSessionInstanceService } from './club-student-session-instance.service';
import { ClubStudentSessionInstanceController } from './club-student-session-instance.controller';
import { clubStudentSessionInstanceProvider } from './entities/club-student-session-instance.entity';
import { ClubStudentSessionInstanceRepository } from './club-student-session-instance.repository';

@Module({
  controllers: [ClubStudentSessionInstanceController],
  providers: [
    ClubStudentSessionInstanceService,
    ClubStudentSessionInstanceRepository,
    ...clubStudentSessionInstanceProvider,
  ],
  exports: [
    ClubStudentSessionInstanceModule,
    ClubStudentSessionInstanceService,
  ],
})
export class ClubStudentSessionInstanceModule {}
