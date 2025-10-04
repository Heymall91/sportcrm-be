import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 } from 'uuid';

import { Club } from 'src/modules/club/entities/club.entity';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IUser } from 'src/shared/common/interfaces/models/user.interface';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Table({ tableName: 'users' })
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  birthday: String;

  @Column(DataType.FLOAT)
  height: Number;

  @Column(DataType.FLOAT)
  weight: Number;

  @Column(DataType.ENUM('male', 'female'))
  gender: Gender;

  @BelongsToMany(() => Club, () => ClubStaff)
  clubsAsStaff: Club[];

  @BelongsToMany(() => Club, () => ClubStudent)
  clubsAsStudent: Club[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const userProviders = [
  {
    provide: REPOSITORIES.USER,
    useValue: User,
    sequelize,
    paranoid: true,
    modelName: 'User',
    hooks: {
      beforeCreate: (entity: User) => {
        entity.id = v4();
      },
    },
  },
];
