import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IClubStudentSession } from 'src/shared/common/interfaces/models/session.interface';

@Table({ tableName: 'club_student_sessions' })
export class ClubStudentSession
  extends Model<ClubStudentSession>
  implements IClubStudentSession
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => ClubStudent)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  clubStudentId: string;

  @BelongsTo(() => ClubStudent)
  clubStudent: ClubStudent;

  @ForeignKey(() => Session)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  sessionId: string;

  @BelongsTo(() => Session)
  session: Session;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const clubStudentSessionProviders = [
  {
    provide: REPOSITORIES.CLUB_STUDENT_SESSION,
    useValue: ClubStudentSession,
    sequelize,
    paranoid: true,
    modelName: 'ClubStudentSession',
    hooks: {
      beforeCreate: (entity: ClubStudentSession) => {
        entity.id = v4();
      },
    },
  },
];
