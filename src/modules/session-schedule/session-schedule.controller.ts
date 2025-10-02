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

import { SessionScheduleService } from './session-schedule.service';
import { CreateSessionScheduleDto } from './dto/create-session-schedule.dto';
import { UpdateSessionScheduleDto } from './dto/update-session-schedule.dto';
import { SessionSchedule } from './entities/session-schedule.entity';

@ApiTags('Session Schedule')
@Controller('session-schedule')
export class SessionScheduleController {
  constructor(
    private readonly sessionScheduleService: SessionScheduleService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSessionSchedule(
    @Body() createSessionScheduleDto: CreateSessionScheduleDto,
  ): Promise<SessionSchedule> {
    return this.sessionScheduleService.createSessionSchedule(
      createSessionScheduleDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSessionSchedules(): Promise<SessionSchedule[]> {
    return this.sessionScheduleService.getSessionSchedules();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSessionSchedule(@Param('id') id: UUID): Promise<SessionSchedule> {
    return this.sessionScheduleService.getSessionSchedule(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSessionSchedule(
    @Param('id') id: UUID,
    @Body() updateSessionScheduleDto: UpdateSessionScheduleDto,
  ): Promise<SessionSchedule> {
    return this.sessionScheduleService.updateSessionSchedule(
      id,
      updateSessionScheduleDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeSessionSchedule(@Param('id') id: UUID): Promise<SessionSchedule> {
    return this.sessionScheduleService.removeSessionSchedule(id);
  }
}
