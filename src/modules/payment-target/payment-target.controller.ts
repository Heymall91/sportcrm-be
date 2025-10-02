import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { PaymentTargetService } from './payment-target.service';
import { CreatePaymentTargetDto } from './dto/create-payment-target.dto';
import { UpdatePaymentTargetDto } from './dto/update-payment-target.dto';
import { PaymentTarget } from './entities/payment-target.entity';

@ApiTags('Payment Target')
@Controller('paymentTarget')
export class PaymentTargetController {
  constructor(private readonly paymentTargetService: PaymentTargetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaymentTarget(
    @Body() createPaymentTargetDto: CreatePaymentTargetDto,
  ): Promise<PaymentTarget> {
    return this.paymentTargetService.createPaymentTarget(
      createPaymentTargetDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPaymentTargets(): Promise<PaymentTarget[]> {
    return this.paymentTargetService.getPaymentTargets();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPaymentTarget(@Param('id') id: UUID): Promise<PaymentTarget> {
    return this.paymentTargetService.getPaymentTarget(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePaymentTarget(
    @Param('id') id: UUID,
    @Body() updatePaymentTargetDto: UpdatePaymentTargetDto,
  ): Promise<PaymentTarget> {
    return this.paymentTargetService.updatePaymentTarget(
      id,
      updatePaymentTargetDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removePaymentTarget(@Param('id') id: UUID): Promise<PaymentTarget> {
    return this.paymentTargetService.removePaymentTarget(id);
  }
}
