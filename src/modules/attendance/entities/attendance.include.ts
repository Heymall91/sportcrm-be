import { SessionInstance } from '../../session-instance/entities/session-instance.entity';

export const ATTENDANCE_INCLUDE = {
  create: () => {
    return [{ model: SessionInstance }];
  },
  getOne: () => {
    return [{ model: SessionInstance }];
  },
  getAll: () => {
    return [{ model: SessionInstance }];
  },
};
