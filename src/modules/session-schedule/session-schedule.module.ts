import { Module } from '@nestjs/common';

import { SessionScheduleController } from './session-schedule.controller';
import { SessionScheduleService } from './session-schedule.service';
import { SessionScheduleRepository } from './session-schedule.repository';
import { sessionScheduleProviders } from './entities/session-schedule.entity';

@Module({
  controllers: [SessionScheduleController],
  providers: [
    SessionScheduleService,
    SessionScheduleRepository,
    ...sessionScheduleProviders,
  ],
  exports: [SessionScheduleModule, SessionScheduleService],
})
export class SessionScheduleModule {}
