import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { SessionInstance } from '../../session-instance/entities/session-instance.entity';

export const CLUB_STUDENT_SESSION_INSTANCE_INCLUDE = {
  create: () => {
    return [{ model: SessionInstance }, { model: ClubStudent }];
  },
  getOne: () => {
    return [{ model: SessionInstance }, { model: ClubStudent }];
  },
  getAll: () => {
    return [{ model: SessionInstance }, { model: ClubStudent }];
  },
};
