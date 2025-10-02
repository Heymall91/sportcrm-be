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

import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAttendance(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAttendances(): Promise<Attendance[]> {
    return this.attendanceService.getAttendances();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAttendance(@Param('id') id: UUID): Promise<Attendance> {
    return this.attendanceService.getAttendance(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateAttendance(
    @Param('id') id: UUID,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.updateAttendance(id, updateAttendanceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeAttendance(@Param('id') id: UUID): Promise<Attendance> {
    return this.attendanceService.removeAttendance(id);
  }
}
