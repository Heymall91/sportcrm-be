import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({
    example: '6f736536-3756-4c3e-875e-510b9a4a20e0',
    description: 'id',
  })
  id?: string;

  @ApiProperty({ example: 'Secret club', description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-10-23T10:15:00Z', description: 'Created at' })
  createdAt?: string;

  @ApiProperty({ example: '2025-10-24T10:15:00Z', description: 'Updated at' })
  updatedAt?: string;
}
