import { PartialType } from '@nestjs/mapped-types';
import { CreateClubStaffDto } from './create-club-staff.dto';

export class UpdateClubStaffDto extends PartialType(CreateClubStaffDto) {}
