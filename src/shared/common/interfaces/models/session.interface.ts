import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Club } from 'src/modules/club/entities/club.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { SessionParticipant } from 'src/modules/session-participant/entities/session-participant.entity';
import { SessionSchedule } from 'src/modules/session-schedule/entities/session-schedule.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export interface ISession {
  id: string;
  clubId: string;
  club: Club;
  clubStudents: ClubStudent[];
  name: string;
  defaultDurationInMinutes: number;
  sessionSchedules: SessionSchedule[];
  sessionParticipants: SessionParticipant[];
  payments: Payment[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ISessionParticipant {
  id: string;
  sessionId: string;
  clubStudentId: string;
  session: Session;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IClubStudentSession {
  id: string;
  clubStudentId: string;
  clubStudent: ClubStudent;
  sessionId: string;
  session: Session;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
