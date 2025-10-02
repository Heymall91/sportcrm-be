import { SessionInstance } from '../../session-instance/entities/session-instance.entity';
import { Session } from '../../session/entities/session.entity';

export const SESSION_SCHEDULE_INCLUDE = {
  create: () => {
    return [{ model: Session }, { model: SessionInstance }];
  },
  getOne: () => {
    return [{ model: Session }, { model: SessionInstance }];
  },
  getAll: () => {
    return [{ model: Session }, { model: SessionInstance }];
  },
};
