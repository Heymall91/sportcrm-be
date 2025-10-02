import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export const CLUB_STUDENT_SESSION_INCLUDE = {
  create: () => {
    return [{ model: ClubStudent }, { model: Session }];
  },
  getOne: () => {
    return [{ model: ClubStudent }, { model: Session }];
  },
  getAll: () => {
    return [{ model: ClubStudent }, { model: Session }];
  },
};
