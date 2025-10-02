import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  ForeignKey,
  HasMany,
  Default,
  UpdatedAt,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { SessionSchedule } from '../../session-schedule/entities/session-schedule.entity';
import { SessionParticipant } from '../../session-participant/entities/session-participant.entity';
import { REPOSITORIES } from '../../../shared/helpers/repositories';
import { Club } from 'src/modules/club/entities/club.entity';
import { ClubStudentSession } from 'src/modules/club-student-session/entities/club-student-session.entity';
import { PaymentTarget } from 'src/modules/payment-target/entities/payment-target.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { ISession } from 'src/shared/common/interfaces/models/session.interface';

@Table({ tableName: 'sessions' })
export class Session extends Model<Session> implements ISession {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Club)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  clubId: string;

  @BelongsTo(() => Club)
  club: Club;

  @BelongsToMany(() => ClubStudent, () => ClubStudentSession)
  clubStudents: ClubStudent[];

  @Column(DataType.STRING)
  name: string;

  @Default(30)
  @Column(DataType.INTEGER)
  defaultDurationInMinutes: number;

  @HasMany(() => SessionSchedule)
  sessionSchedules: SessionSchedule[];

  @HasMany(() => SessionParticipant)
  sessionParticipants: SessionParticipant[];

  @BelongsToMany(() => Payment, () => PaymentTarget)
  payments: Payment[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const sessionProviders = [
  {
    provide: REPOSITORIES.SESSION,
    useValue: Session,
    sequelize,
    paranoid: true,
    modelName: 'Sessions',
    hooks: {
      beforeCreate: (entity: Session) => {
        entity.id = v4();
      },
    },
  },
];
