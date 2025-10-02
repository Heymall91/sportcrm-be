import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  ForeignKey,
  Default,
  UpdatedAt,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { Session } from '../../session/entities/session.entity';
import { REPOSITORIES } from '../../../shared/helpers/repositories';
import { SessionInstance } from '../../session-instance/entities/session-instance.entity';
import { ISessionSchedule } from 'src/shared/common/interfaces/models/session-schedule.interface';

export enum SessionScheduleType {
  ONCE = 'ONCE',
  WEEKLY = 'WEEKLY',
}

@Table({ tableName: 'session_schedules' })
export class SessionSchedule
  extends Model<SessionSchedule>
  implements ISessionSchedule
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Session)
  @Column(DataType.UUID)
  sessionId: string;

  @Column(DataType.ENUM('ONCE', 'WEEKLY'))
  type: SessionScheduleType;

  @Column(DataType.INTEGER)
  durationMinutes: number;

  @Column(DataType.TIME)
  time: string;

  @Column(DataType.DATE)
  onceDate?: Date;

  @Column(DataType.DATE)
  startDate?: Date;

  @Column(DataType.DATE)
  endDate?: Date;

  @Column(DataType.STRING)
  dayOfWeekMask?: string;

  @BelongsTo(() => Session)
  session: Session;

  @HasMany(() => SessionInstance)
  sessionInstances: SessionInstance[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const sessionScheduleProviders = [
  {
    provide: REPOSITORIES.SESSION_SCHEDULE,
    useValue: SessionSchedule,
    sequelize,
    paranoid: true,
    modelName: 'SessionSchedule',
    hooks: {
      beforeCreate: (entity: SessionSchedule) => {
        entity.id = v4();
      },
    },
  },
];
