import { Session } from 'src/modules/session/entities/session.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const CLUB_INCLUDE = {
  create: () => {
    return [
      { model: Session },
      { model: User, as: 'staff', through: { attributes: [] } },
      { model: User, as: 'students', through: { attributes: [] } },
    ];
  },
  getOne: () => {
    return [
      { model: Session },
      { model: User, as: 'staff', through: { attributes: [] } },
      { model: User, as: 'students', through: { attributes: [] } },
    ];
  },
  getAll: () => {
    return [
      { model: Session },
      { model: User, as: 'staff', through: { attributes: [] } },
      { model: User, as: 'students', through: { attributes: [] } },
    ];
  },
};
