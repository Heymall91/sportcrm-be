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

import { Club } from 'src/modules/club/entities/club.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IClubStaff } from 'src/shared/common/interfaces/models/user.interface';

export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Table({ tableName: 'club_staffs' })
export class ClubStaff extends Model<ClubStaff> implements IClubStaff {
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

  @Column
  status: StaffStatus;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const clubStaffProviders = [
  {
    provide: REPOSITORIES.CLUB_STAFF,
    useValue: ClubStaff,
    sequelize,
    paranoid: true,
    modelName: 'ClubStaff',
    hooks: {
      beforeCreate: (entity: ClubStaff) => {
        entity.id = v4();
      },
    },
  },
];
