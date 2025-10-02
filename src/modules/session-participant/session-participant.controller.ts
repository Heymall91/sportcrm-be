import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { SessionParticipantService } from './session-participant.service';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto';
import { SessionParticipant } from './entities/session-participant.entity';

@ApiTags('Session Participant')
@Controller('session-participant')
export class SessionParticipantController {
  constructor(
    private readonly sessionParticipantService: SessionParticipantService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSessionParticipant(
    @Body() createSessionParticipantDto: CreateSessionParticipantDto,
  ): Promise<SessionParticipant> {
    return this.sessionParticipantService.createSessionParticipant(
      createSessionParticipantDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSessionParticipants(): Promise<SessionParticipant[]> {
    return this.sessionParticipantService.getSessionParticipants();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSessionParticipant(
    @Param('id') id: UUID,
  ): Promise<SessionParticipant> {
    return this.sessionParticipantService.getSessionParticipant(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSessionParticipant(
    @Param('id') id: UUID,
    @Body() updateSessionParticipantDto: UpdateSessionParticipantDto,
  ): Promise<SessionParticipant> {
    return this.sessionParticipantService.updateSessionParticipant(
      id,
      updateSessionParticipantDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeSessionParticipant(
    @Param('id') id: UUID,
  ): Promise<SessionParticipant> {
    return this.sessionParticipantService.removeSessionParticipant(id);
  }
}
