import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { SessionSchedule } from '../../session-schedule/entities/session-schedule.entity';

export const SESSION_INSTANCE_INCLUDE = {
  create: () => {
    return [
      { model: SessionSchedule },
      { model: Attendance },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
  getOne: () => {
    return [
      { model: SessionSchedule },
      { model: Attendance },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
  getAll: () => {
    return [
      { model: SessionSchedule },
      { model: Attendance },
      { model: ClubStudent, through: { attributes: [] } },
    ];
  },
};
