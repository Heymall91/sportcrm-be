import { Session } from 'src/modules/session/entities/session.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IClub {
  id: string;
  name: string;
  staff: User[];
  students: User[];
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
