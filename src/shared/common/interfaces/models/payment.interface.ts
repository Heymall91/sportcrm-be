import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import {
  Payment,
  PaymentMethod,
} from 'src/modules/payment/entities/payment.entity';
import { Session } from 'src/modules/session/entities/session.entity';

export interface IPayment {
  id: string;
  clubStudentId: string;
  clubStudent: ClubStudent;
  amount: number;
  method: PaymentMethod;
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IPaymentTarget {
  id: string;
  paymentId: string;
  payment: Payment;
  sessionId: string;
  session: Session;
  month: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
