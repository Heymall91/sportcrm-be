import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  DeletedAt,
  CreatedAt,
  Default,
  UpdatedAt,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { Session } from '../../session/entities/session.entity';
import { REPOSITORIES } from '../../../shared/helpers/repositories';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { ISessionParticipant } from 'src/shared/common/interfaces/models/session.interface';

@Table({ tableName: 'session_participants' })
export class SessionParticipant
  extends Model<SessionParticipant>
  implements ISessionParticipant
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Session)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  sessionId: string;

  @ForeignKey(() => ClubStudent)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  clubStudentId: string;

  @BelongsTo(() => Session, { as: 'sessionPartisipantDetails' })
  session: Session;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const sessionParticipantProviders = [
  {
    provide: REPOSITORIES.SESSION_PARTICIPANT,
    useValue: SessionParticipant,
    sequelize,
    paranoid: true,
    modelName: 'SessionParticipant',
    hooks: {
      beforeCreate: (entity: SessionParticipant) => {
        entity.id = v4();
      },
    },
  },
];
