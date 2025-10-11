import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
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
    phone: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsEnum(GenderType)
    gender: GenderType;

    @IsNumber()
    @IsNotEmpty()
    height: number;

    @IsNumber()
    @IsNotEmpty()
    weight: number;

}
