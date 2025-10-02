import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { PAYMENT_INCLUDE } from './entities/payment.include';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @Inject(REPOSITORIES.PAYMENT) private paymentsRepository: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsRepository.create<Payment>(
      { ...createPaymentDto },
      { include: PAYMENT_INCLUDE.create() },
    );
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.findAll({
      include: PAYMENT_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<Payment> {
    return this.paymentsRepository.findOne({
      where: { id },
      include: PAYMENT_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<Payment> {
    return this.paymentsRepository.findOne({
      where: { id },
      include: PAYMENT_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<[number]> {
    return this.paymentsRepository.update(updatePaymentDto, { where: { id } });
  }

  async remove(id: UUID): Promise<number> {
    return this.paymentsRepository.destroy({ where: { id } });
  }
}
