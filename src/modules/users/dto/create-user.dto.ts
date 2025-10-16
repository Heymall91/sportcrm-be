import { IsString, IsNotEmpty, IsEnum, IsNumber, Length, IsOptional } from 'class-validator';
import { GenderType } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Length(9, 10)
    phone: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsEnum(GenderType)
    gender: GenderType;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

}
