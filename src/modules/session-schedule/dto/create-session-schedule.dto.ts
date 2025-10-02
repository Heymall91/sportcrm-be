import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { SessionScheduleType } from '../entities/session-schedule.entity';

export class CreateSessionScheduleDto {
  @ApiProperty({ enum: SessionScheduleType })
  @IsEnum(SessionScheduleType, { message: 'Valid type required' })
  type: SessionScheduleType;

  @ApiProperty()
  @IsNumber()
  durationMinutes: number;

  @ApiProperty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  sessionId: string;

  @ApiPropertyOptional()
  @IsDate()
  once_date?: Date;

  @ApiPropertyOptional()
  @IsDate()
  start_date?: Date;

  @ApiPropertyOptional()
  @IsDate()
  end_date?: Date;

  @ApiPropertyOptional()
  @IsNumber()
  day_of_week_mask?: number;
}
