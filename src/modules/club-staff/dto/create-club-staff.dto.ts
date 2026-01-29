import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { StatusStaff } from '../entities/club-staff.entity';

export class CreateClubStaffDto {
  @IsString()
  @IsNotEmpty()
  clubId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(StatusStaff)
  @IsNotEmpty()
  status: StatusStaff;
}
