import { SessionInstance } from 'src/modules/session-instance/entities/session-instance.entity';
import { SessionScheduleType } from 'src/modules/session-schedule/entities/session-schedule.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export interface ISessionSchedule {
  id: string;
  sessionId: string;
  type: SessionScheduleType;
  durationMinutes: number;
  time: string;
  onceDate?: Date;
  startDate?: Date;
  endDate?: Date;
  dayOfWeekMask?: string;
  session: Session;
  sessionInstances: SessionInstance[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
