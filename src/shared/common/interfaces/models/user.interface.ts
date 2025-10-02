import { StaffStatus } from 'src/modules/club-staff/entities/club-staff.entity';
import { StudentStatus } from 'src/modules/club-student/entities/club-student.entity';
import { Club } from 'src/modules/club/entities/club.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { SessionInstance } from 'src/modules/session-instance/entities/session-instance.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { Gender, User } from 'src/modules/user/entities/user.entity';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  gender: Gender;
  clubsAsStaff: Club[];
  clubsAsStudent: Club[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IClubStaff {
  id: string;
  clubId: string;
  club: Club;
  userId: string;
  user: User;
  status: StaffStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IClubStudent {
  id: string;
  clubId: string;
  club: Club;
  userId: string;
  user: User;
  status: StudentStatus;
  payments: Payment[];
  sessions: Session[];
  sessionInstances: SessionInstance[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
