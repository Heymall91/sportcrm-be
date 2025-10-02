import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export const PAYMENT_INCLUDE = {
  create: () => {
    return [
      { model: ClubStudent },
      { model: Session, through: { attributes: [] } },
    ];
  },
  getOne: () => {
    return [
      { model: ClubStudent },
      { model: Session, through: { attributes: [] } },
    ];
  },
  getAll: () => {
    return [
      { model: ClubStudent },
      { model: Session, through: { attributes: [] } },
    ];
  },
};
