import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import {
  SessionInstance,
  SessionInstanceStatus,
} from 'src/modules/session-instance/entities/session-instance.entity';
import { SessionSchedule } from 'src/modules/session-schedule/entities/session-schedule.entity';

export interface ISessionInstance {
  id: string;
  sessionScheduleId: string;
  datatime: Date;
  durationMinutes: number;
  status: SessionInstanceStatus;
  sessionSchedule: SessionSchedule;
  attendances: Attendance[];
  clubStudents: ClubStudent[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IAttendance {
  id: string;
  sessionInstanceId: string;
  sessionStudentId: string;
  attended: boolean;
  sessionInstance: SessionInstance;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IClubStudentSessionInstance {
  id: string;
  clubStudentId: string;
  clubStudent: ClubStudent;
  sessionInstanceId: string;
  sessionInstance: SessionInstance;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
