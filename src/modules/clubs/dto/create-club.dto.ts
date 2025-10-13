import { IsNotEmpty, IsString } from "class-validator";

export class CreateClubDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
