import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { PaymentTargetRepository } from './payment-target.repository';
import { CreatePaymentTargetDto } from './dto/create-payment-target.dto';
import { UpdatePaymentTargetDto } from './dto/update-payment-target.dto';
import { PaymentTarget } from './entities/payment-target.entity';

@Injectable()
export class PaymentTargetService {
  constructor(
    private readonly paymentTargetsRepository: PaymentTargetRepository,
  ) {}

  async createPaymentTarget(
    createPaymentTargetDto: CreatePaymentTargetDto,
  ): Promise<PaymentTarget> {
    const result = await this.paymentTargetsRepository.create(
      createPaymentTargetDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getPaymentTargets(): Promise<PaymentTarget[]> {
    const result = Array.from(await this.paymentTargetsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getPaymentTarget(id: UUID): Promise<PaymentTarget> {
    const result = await this.paymentTargetsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updatePaymentTarget(
    id: UUID,
    updatePaymentTargetDto: UpdatePaymentTargetDto,
  ): Promise<PaymentTarget> {
    const result = await this.paymentTargetsRepository.update(
      id,
      updatePaymentTargetDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.paymentTargetsRepository.findOne(id);
  }

  async removePaymentTarget(id: UUID): Promise<PaymentTarget> {
    const result = await this.paymentTargetsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.paymentTargetsRepository.findParanoid(id);
  }
}
