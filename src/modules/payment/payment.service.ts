import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentsRepository: PaymentRepository) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const result = await this.paymentsRepository.create(createPaymentDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getPayments(): Promise<Payment[]> {
    const result = Array.from(await this.paymentsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getPayment(id: UUID): Promise<Payment> {
    const result = await this.paymentsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updatePayment(
    id: UUID,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const result = await this.paymentsRepository.update(id, updatePaymentDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.paymentsRepository.findOne(id);
  }

  async removePayment(id: UUID): Promise<Payment> {
    const result = await this.paymentsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.paymentsRepository.findParanoid(id);
  }
}
