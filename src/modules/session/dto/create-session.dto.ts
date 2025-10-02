import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  clubId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  defaultDurationInMinutes: number;
}
