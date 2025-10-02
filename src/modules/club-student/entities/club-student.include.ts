import { Club } from 'src/modules/club/entities/club.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { SessionInstance } from 'src/modules/session-instance/entities/session-instance.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const CLUB_STUDENT_INCLUDE = {
  create: () => {
    return [
      { model: Club },
      { model: User },
      { model: Payment },
      { model: Session, through: { attributes: [] } },
      { model: SessionInstance, through: { attributes: [] } },
    ];
  },
  getOne: () => {
    return [
      { model: Club },
      { model: User },
      { model: Payment },
      { model: Session, through: { attributes: [] } },
      { model: SessionInstance, through: { attributes: [] } },
    ];
  },
  getAll: () => {
    return [
      { model: Club },
      { model: User },
      { model: Payment },
      { model: Session, through: { attributes: [] } },
      { model: SessionInstance, through: { attributes: [] } },
    ];
  },
};
