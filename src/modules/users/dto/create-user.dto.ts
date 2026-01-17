import {
  IsString,
  IsOptional,
  IsBoolean
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
    description: 'Auth0 User ID',
  })
  @IsOptional()
  @IsString()
  auth0ID?: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isRegistrationCompleted: boolean;

  @ApiProperty({ example: '2025-10-23T10:15:00Z', description: 'Created at' })
  createdAt?: string;

  @ApiProperty({ example: '2025-10-24T10:15:00Z', description: 'Updated at' })
  updatedAt?: string;
}
