import { IsString, IsEnum } from "class-validator";
import { StatusStaff } from "../entities/club-staff.entity";

export class CreateClubStaffDto {
    @IsString()
    clubId: string;

    @IsString()
    userId: string;

    @IsEnum(StatusStaff)
    status: StatusStaff;
}
