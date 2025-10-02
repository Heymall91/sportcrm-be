import { Module } from '@nestjs/common';

import { SessionParticipantController } from './session-participant.controller';
import { SessionParticipantService } from './session-participant.service';
import { sessionParticipantProviders } from './entities/session-participant.entity';
import { SessionParticipantRepository } from './session-participant.repository';

@Module({
  controllers: [SessionParticipantController],
  providers: [
    SessionParticipantService,
    SessionParticipantRepository,
    ...sessionParticipantProviders,
  ],
  exports: [SessionParticipantModule, SessionParticipantService],
})
export class SessionParticipantModule {}
