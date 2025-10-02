import { Club } from 'src/modules/club/entities/club.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const CLUB_STAFF_INCLUDE = {
  create: () => {
    return [{ model: Club }, { model: User }];
  },
  getOne: () => {
    return [{ model: Club }, { model: User }];
  },
  getAll: () => {
    return [{ model: Club }, { model: User }];
  },
};
