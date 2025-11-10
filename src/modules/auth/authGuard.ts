import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class YourController {
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}