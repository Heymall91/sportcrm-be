import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { ATTENDANCE_INCLUDE } from './entities/attendance.include';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceRepository {
  constructor(
    @Inject(REPOSITORIES.ATTENDANCE)
    private attendanceRepository: typeof Attendance,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceRepository.create<Attendance>(
      {
        ...createAttendanceDto,
      },
      { include: ATTENDANCE_INCLUDE.create() },
    );
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.findAll({
      include: ATTENDANCE_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<Attendance> {
    return this.attendanceRepository.findOne({
      where: { id },
      include: ATTENDANCE_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<Attendance> {
    return this.attendanceRepository.findOne({
      where: { id },
      include: ATTENDANCE_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<[number]> {
    return this.attendanceRepository.update(updateAttendanceDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.attendanceRepository.destroy({ where: { id } });
  }
}
