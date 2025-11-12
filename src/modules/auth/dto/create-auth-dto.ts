import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class Auth0Dto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    auth0ID: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;
}