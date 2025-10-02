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

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPayments(): Promise<Payment[]> {
    return this.paymentService.getPayments();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPayment(@Param('id') id: UUID): Promise<Payment> {
    return this.paymentService.getPayment(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePayment(
    @Param('id') id: UUID,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removePayment(@Param('id') id: UUID): Promise<Payment> {
    return this.paymentService.removePayment(id);
  }
}
