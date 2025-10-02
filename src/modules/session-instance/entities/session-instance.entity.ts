import {
  Column,
  ForeignKey,
  Model,
  Table,
  PrimaryKey,
  DataType,
  Default,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { SessionSchedule } from '../../session-schedule/entities/session-schedule.entity';
import { REPOSITORIES } from '../../../shared/helpers/repositories';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { ClubStudentSessionInstance } from '../../club-student-session-instance/entities/club-student-session-instance.entity';
import { ISessionInstance } from 'src/shared/common/interfaces/models/session-instance.interface';

export enum SessionInstanceStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Table({ tableName: 'session_instances' })
export class SessionInstance
  extends Model<SessionInstance>
  implements ISessionInstance
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => SessionSchedule)
  @Column(DataType.UUID)
  sessionScheduleId: string;

  @Column(DataType.DATE)
  datatime: Date;

  @Column(DataType.INTEGER)
  durationMinutes: number;

  @Column(DataType.ENUM('PENDING', 'COMPLITED', 'CANCELLED'))
  status: SessionInstanceStatus;

  @BelongsTo(() => SessionSchedule)
  sessionSchedule: SessionSchedule;

  @HasMany(() => Attendance)
  attendances: Attendance[];

  @BelongsToMany(() => ClubStudent, () => ClubStudentSessionInstance)
  clubStudents: ClubStudent[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const sessionInstanceProviders = [
  {
    provide: REPOSITORIES.SESSION_INSTANCE,
    useValue: SessionInstance,
    sequelize,
    paranoid: true,
    modelName: 'SessionInstance',
    hooks: {
      beforeCreate: (entity: SessionInstance) => {
        entity.id = v4();
      },
    },
  },
];
