import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { PAYMENT_TARGET_INCLUDE } from './entities/payment-target.include';
import { CreatePaymentTargetDto } from './dto/create-payment-target.dto';
import { UpdatePaymentTargetDto } from './dto/update-payment-target.dto';
import { PaymentTarget } from './entities/payment-target.entity';

@Injectable()
export class PaymentTargetRepository {
  constructor(
    @Inject(REPOSITORIES.PAYMENT_TARGET)
    private paymentTargetsRepository: typeof PaymentTarget,
  ) {}

  async create(
    createPaymentTargetDto: CreatePaymentTargetDto,
  ): Promise<PaymentTarget> {
    return this.paymentTargetsRepository.create<PaymentTarget>(
      {
        ...createPaymentTargetDto,
      },
      { include: PAYMENT_TARGET_INCLUDE.create() },
    );
  }

  async findAll(): Promise<PaymentTarget[]> {
    return this.paymentTargetsRepository.findAll({
      include: PAYMENT_TARGET_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<PaymentTarget> {
    return this.paymentTargetsRepository.findOne({
      where: { id },
      include: PAYMENT_TARGET_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<PaymentTarget> {
    return this.paymentTargetsRepository.findOne({
      where: { id },
      include: PAYMENT_TARGET_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updatePaymentTargetDto: UpdatePaymentTargetDto,
  ): Promise<[number]> {
    return this.paymentTargetsRepository.update(updatePaymentTargetDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.paymentTargetsRepository.destroy({ where: { id } });
  }
}
