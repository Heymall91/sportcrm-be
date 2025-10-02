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

import { ClubStudentService } from './club-student.service';
import { CreateClubStudentDto } from './dto/create-club-student.dto';
import { UpdateClubStudentDto } from './dto/update-club-student.dto';
import { ClubStudent } from './entities/club-student.entity';

@ApiTags('Club Student')
@Controller('clubStudent')
export class ClubStudentController {
  constructor(private readonly clubStudentService: ClubStudentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createClubStudent(
    @Body() createClubStudentDto: CreateClubStudentDto,
  ): Promise<ClubStudent> {
    return this.clubStudentService.createClubStudent(createClubStudentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getClubStudents(): Promise<ClubStudent[]> {
    return this.clubStudentService.getClubStudents();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClubStudent(@Param('id') id: UUID): Promise<ClubStudent> {
    return this.clubStudentService.getClubStudent(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClubStudent(
    @Param('id') id: UUID,
    @Body() updateClubStudentDto: UpdateClubStudentDto,
  ): Promise<ClubStudent> {
    return this.clubStudentService.updateClubStudent(id, updateClubStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeClubStudent(@Param('id') id: UUID): Promise<ClubStudent> {
    return this.clubStudentService.removeClubStudent(id);
  }
}
