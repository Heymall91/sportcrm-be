import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    const result = await this.attendanceRepository.create(createAttendanceDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getAttendances(): Promise<Attendance[]> {
    const result = this.attendanceRepository.findAll();

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getAttendance(id: UUID): Promise<Attendance> {
    const result = await this.attendanceRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateAttendance(
    id: UUID,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    const result = await this.attendanceRepository.update(
      id,
      updateAttendanceDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.attendanceRepository.findOne(id);
  }

  async removeAttendance(id: UUID): Promise<Attendance> {
    const result = await this.attendanceRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.attendanceRepository.findParanoid(id);
  }
}
