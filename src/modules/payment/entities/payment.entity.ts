import {
  BelongsTo,
  BelongsToMany,
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

import { Session } from 'src/modules/session/entities/session.entity';
import { PaymentTarget } from 'src/modules/payment-target/entities/payment-target.entity';
import { ClubStudent } from 'src/modules/club-student/entities/club-student.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IPayment } from 'src/shared/common/interfaces/models/payment.interface';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> implements IPayment {
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

  @Column(DataType.FLOAT)
  amount: number;

  @Column(DataType.ENUM('cash', 'card'))
  method: PaymentMethod;

  @BelongsToMany(() => Session, () => PaymentTarget)
  sessions: Session[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const paymentProviders = [
  {
    provide: REPOSITORIES.PAYMENT,
    useValue: Payment,
    sequelize,
    paranoid: true,
    modelName: 'Payment',
    hooks: {
      beforeCreate: (entity: Payment) => {
        entity.id = v4();
      },
    },
  },
];
