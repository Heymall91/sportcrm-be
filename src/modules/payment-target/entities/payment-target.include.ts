import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export const PAYMENT_TARGET_INCLUDE = {
  create: () => {
    return [{ model: Payment }, { model: Session }];
  },
  getOne: () => {
    return [{ model: Payment }, { model: Session }];
  },
  getAll: () => {
    return [{ model: Payment }, { model: Session }];
  },
};
