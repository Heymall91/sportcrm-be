import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { User } from 'src/modules/user/entities/user.entity';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IClub } from 'src/shared/common/interfaces/models/club.interface';

@Table({ tableName: 'clubs' })
export class Club extends Model<Club> implements IClub {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => User, () => ClubStaff)
  staff: User[];

  @BelongsToMany(() => User, () => ClubStudent)
  students: User[];

  @HasMany(() => Session)
  sessions: Session[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const clubProviders = [
  {
    provide: REPOSITORIES.CLUB,
    useValue: Club,
    sequelize,
    paranoid: true,
    modelName: 'Club',
    hooks: {
      beforeCreate: (entity: Club) => {
        entity.id = v4();
      },
    },
  },
];
