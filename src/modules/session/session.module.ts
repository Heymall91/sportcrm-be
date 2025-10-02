import { Module } from '@nestjs/common';

import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { sessionProviders } from './entities/session.entity';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, ...sessionProviders],
  exports: [SessionService],
})
export class SessionModule {}
