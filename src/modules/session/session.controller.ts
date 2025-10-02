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

import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    return this.sessionService.createSession(createSessionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSessions(): Promise<Session[]> {
    return this.sessionService.getSessions();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSession(@Param('id') id: UUID): Promise<Session> {
    return this.sessionService.getSession(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSession(
    @Param('id') id: UUID,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionService.updateSession(id, updateSessionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeSession(@Param('id') id: UUID): Promise<Session> {
    return this.sessionService.removeSession(id);
  }
}
