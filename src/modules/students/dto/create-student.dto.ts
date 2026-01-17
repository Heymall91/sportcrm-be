import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderType } from '../entities/student.entity';

export class CreateStudentDto {

  @ApiProperty({ example: 'Nikanor' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Onackij' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'nikanor@mail.com' })
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional({ example: '+48123456789' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: '2000-01-15' })
  @IsOptional()
  @IsDateString()
  birthday: Date;

  @ApiPropertyOptional({ 
    enum: GenderType, 
    example: GenderType.MALE 
  })
  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @ApiPropertyOptional({ example: 182 })
  @IsOptional()
  @IsInt()
  height: number;

  @ApiPropertyOptional({ example: 72 })
  @IsOptional()
  @IsInt()
  weight: number;

}
