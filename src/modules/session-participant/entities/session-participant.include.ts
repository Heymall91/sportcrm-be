import { Session } from '../../session/entities/session.entity';

export const SESSION_PARTICIPANT_INCLUDE = {
  create: () => {
    return [{ model: Session }];
  },
  getOne: () => {
    return [{ model: Session }];
  },
  getAll: () => {
    return [{ model: Session }];
  },
};
