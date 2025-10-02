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

import { ClubStudentSessionInstanceService } from './club-student-session-instance.service';
import { CreateClubStudentSessionInstanceDto } from './dto/create-club-student-session-instance.dto';
import { UpdateClubStudentSessionInstanceDto } from './dto/update-club-student-session-instance.dto';
import { ClubStudentSessionInstance } from './entities/club-student-session-instance.entity';

@ApiTags('Club Student Session Instance')
@Controller('club-student-session-instance')
export class ClubStudentSessionInstanceController {
  constructor(
    private readonly clubStudentSessionInstanceService: ClubStudentSessionInstanceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createClubStudentSessionInstance(
    @Body()
    createClubStudentSessionInstanceDto: CreateClubStudentSessionInstanceDto,
  ): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstanceService.createClubStudentSessionInstance(
      createClubStudentSessionInstanceDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getClubStudentSessionInstances(): Promise<
    ClubStudentSessionInstance[]
  > {
    return this.clubStudentSessionInstanceService.getClubStudentSessionInstances();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClubStudentSessionInstance(
    @Param('id') id: UUID,
  ): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstanceService.getClubStudentSessionInstance(
      id,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClubStudentSessionInstance(
    @Param('id') id: UUID,
    @Body()
    updateClubStudentSessionInstanceDto: UpdateClubStudentSessionInstanceDto,
  ): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstanceService.updateClubStudentSessionInstance(
      id,
      updateClubStudentSessionInstanceDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeClubStudentSessionInstance(
    @Param('id') id: UUID,
  ): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstanceService.removeClubStudentSessionInstance(
      id,
    );
  }
}
