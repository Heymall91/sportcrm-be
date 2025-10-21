import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './shared/common/utils/responce/responce.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port ?? 3000);
}
bootstrap();
