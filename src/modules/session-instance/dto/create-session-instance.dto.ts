import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { SessionInstanceStatus } from '../entities/session-instance.entity';

export class CreateSessionInstanceDto {
  @ApiProperty()
  @IsDate()
  datatime: Date;

  @ApiProperty()
  @IsNumber()
  duration_minutes: number;

  @ApiProperty()
  @IsString()
  @IsUUID()
  sessionScheduleId: string;

  @ApiProperty({ enum: SessionInstanceStatus })
  @IsEnum(SessionInstanceStatus, { message: 'Valid status required' })
  status: SessionInstanceStatus;
}
