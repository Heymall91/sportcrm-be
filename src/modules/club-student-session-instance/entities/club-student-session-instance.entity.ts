import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { SessionInstance } from '../../session-instance/entities/session-instance.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IClubStudentSessionInstance } from 'src/shared/common/interfaces/models/session-instance.interface';

@Table({
  tableName: 'club_student_session_instances',
})
export class ClubStudentSessionInstance
  extends Model<ClubStudentSessionInstance>
  implements IClubStudentSessionInstance
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => ClubStudent)
  @Column(DataType.UUID)
  clubStudentId: string;

  @BelongsTo(() => ClubStudent)
  clubStudent: ClubStudent;

  @ForeignKey(() => SessionInstance)
  @Column(DataType.UUID)
  sessionInstanceId: string;

  @BelongsTo(() => SessionInstance)
  sessionInstance: SessionInstance;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const clubStudentSessionInstanceProvider = [
  {
    provide: REPOSITORIES.CLUB_STUDENT_SESSION_INSTANCE,
    useValue: ClubStudentSessionInstance,
    sequelize,
    paranoid: true,
    modelName: 'ClubStudentSessionInstance',
    hooks: {
      beforeCreate: (entity: ClubStudentSessionInstance) => {
        entity.id = v4();
      },
    },
  },
];
