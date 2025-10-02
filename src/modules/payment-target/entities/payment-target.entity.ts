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

import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { IPaymentTarget } from 'src/shared/common/interfaces/models/payment.interface';

@Table({ tableName: 'payment_targets' })
export class PaymentTarget
  extends Model<PaymentTarget>
  implements IPaymentTarget
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Payment)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  paymentId: string;

  @BelongsTo(() => Payment)
  payment: Payment;

  @ForeignKey(() => Session)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  sessionId: string;

  @BelongsTo(() => Session)
  session: Session;

  @Column(DataType.DATE)
  month: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt?: Date;
}

export const paymentTargetProviders = [
  {
    provide: REPOSITORIES.PAYMENT_TARGET,
    useValue: PaymentTarget,
    sequelize,
    paranoid: true,
    modelName: 'PaymentTarget',
    hooks: {
      beforeCreate: (entity: PaymentTarget) => {
        entity.id = v4();
      },
    },
  },
];
