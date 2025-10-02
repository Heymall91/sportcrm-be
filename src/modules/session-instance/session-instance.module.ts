import { Module } from '@nestjs/common';

import { sessionInstanceProviders } from './entities/session-instance.entity';
import { SessionInstanceService } from './session-instance.service';
import { SessionInstanceController } from './session-instance.controller';
import { SessionInstanceRepository } from './session-instance.repository';

@Module({
  controllers: [SessionInstanceController],
  providers: [
    SessionInstanceService,
    SessionInstanceRepository,
    ...sessionInstanceProviders,
  ],
  exports: [SessionInstanceModule, SessionInstanceService],
})
export class SessionInstanceModule {}
