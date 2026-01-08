import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  Length,
  IsOptional,
  IsBoolean
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
    description: 'Auth0 User ID',
  })
  @IsOptional()
  @IsString()
  auth0ID?: string;

  @ApiProperty({ example: 'Ivan', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '1234567890', description: 'Phone' })
  @IsString()
  @IsNotEmpty()
  @Length(9, 10)
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isRegistrationCompleted: boolean;

  @ApiProperty({ example: '2000-05-12', description: 'Birthday' })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ example: 'male', description: "User's gender" })
  @IsEnum(GenderType)
  gender: GenderType;

  @ApiProperty({ example: '183', description: 'Height' })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ example: '65', description: 'Weight' })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: '2025-10-23T10:15:00Z', description: 'Created at' })
  createdAt?: string;

  @ApiProperty({ example: '2025-10-24T10:15:00Z', description: 'Updated at' })
  updatedAt?: string;
}
