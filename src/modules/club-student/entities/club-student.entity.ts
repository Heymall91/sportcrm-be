import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { Session } from 'src/modules/session/entities/session.entity';
import { ClubStudentSession } from 'src/modules/club-student-session/entities/club-student-session.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Club } from 'src/modules/club/entities/club.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { SessionInstance } from 'src/modules/session-instance/entities/session-instance.entity';
import { ClubStudentSessionInstance } from 'src/modules/club-student-session-instance/entities/club-student-session-instance.entity';
import { IClubStudent } from 'src/shared/common/interfaces/models/user.interface';

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Table({ tableName: 'club_students' })
export class ClubStudent extends Model<ClubStudent> implements IClubStudent {
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

  @ForeignKey(() => User)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.ENUM('active', 'inactive'))
  status: StudentStatus;

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsToMany(() => Session, () => ClubStudentSession)
  sessions: Session[];

  @BelongsToMany(() => SessionInstance, () => ClubStudentSessionInstance)
  sessionInstances: SessionInstance[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const clubStudentProviders = [
  {
    provide: REPOSITORIES.CLUB_STUDENT,
    useValue: ClubStudent,
    sequelize,
    paranoid: true,
    modelName: 'ClubStudent',
    hooks: {
      beforeCreate: (entity: ClubStudent) => {
        entity.id = v4();
      },
    },
  },
];
