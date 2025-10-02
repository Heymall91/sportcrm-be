import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { StaffStatus } from '../entities/club-staff.entity';

export class CreateClubStaffDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  clubId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: StaffStatus })
  @IsEnum(StaffStatus, { message: 'Valid role required' })
  status: StaffStatus;
}
