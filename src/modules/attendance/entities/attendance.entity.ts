import {
  Column,
  ForeignKey,
  Model,
  Table,
  PrimaryKey,
  DataType,
  CreatedAt,
  DeletedAt,
  Default,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { SessionInstance } from '../../session-instance/entities/session-instance.entity';
import { REPOSITORIES } from '../../../shared/helpers/repositories';
import { SessionParticipant } from '../../session-participant/entities/session-participant.entity';
import { IAttendance } from 'src/shared/common/interfaces/models/session-instance.interface';

@Table({ tableName: 'attendances' })
export class Attendance extends Model<Attendance> implements IAttendance {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => SessionInstance)
  @Column(DataType.UUID)
  sessionInstanceId: string;

  @ForeignKey(() => SessionParticipant)
  @Column(DataType.UUID)
  sessionStudentId: string;

  @Column(DataType.BOOLEAN)
  attended: boolean;

  @BelongsTo(() => SessionInstance)
  sessionInstance: SessionInstance;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const attendanceProviders = [
  {
    provide: REPOSITORIES.ATTENDANCE,
    useValue: Attendance,
    sequelize,
    paranoid: true,
    modelName: 'Attendance',
    hooks: {
      beforeCreate: (entity: Attendance) => {
        entity.id = v4();
      },
    },
  },
];
