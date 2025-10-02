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

import { ClubStudentSessionService } from './club-student-session.service';
import { CreateClubStudentSessionDto } from './dto/create-club-student-session.dto';
import { UpdateClubStudentSessionDto } from './dto/update-club-student-session.dto';
import { ClubStudentSession } from './entities/club-student-session.entity';

@ApiTags('Club Student Session')
@Controller('clubStudentSession')
export class ClubStudentSessionController {
  constructor(
    private readonly clubStudentSessionService: ClubStudentSessionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClubStudentSession(
    @Body() createClubStudentSessionDto: CreateClubStudentSessionDto,
  ): Promise<ClubStudentSession> {
    return this.clubStudentSessionService.createClubStudentSession(
      createClubStudentSessionDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getClubStudentSessions(): Promise<ClubStudentSession[]> {
    return this.clubStudentSessionService.getClubStudentSessions();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClubStudentSession(
    @Param('id') id: UUID,
  ): Promise<ClubStudentSession> {
    return this.clubStudentSessionService.getClubStudentSession(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClubStudentSession(
    @Param('id') id: UUID,
    @Body() updateClubStudentSessionDto: UpdateClubStudentSessionDto,
  ): Promise<ClubStudentSession> {
    return this.clubStudentSessionService.updateClubStudentSession(
      id,
      updateClubStudentSessionDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeClubStudentSession(
    @Param('id') id: UUID,
  ): Promise<ClubStudentSession> {
    return this.clubStudentSessionService.removeClubStudentSession(id);
  }
}
