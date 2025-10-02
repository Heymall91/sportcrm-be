import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender, { message: 'Valid role required' })
  gender: Gender;
}
