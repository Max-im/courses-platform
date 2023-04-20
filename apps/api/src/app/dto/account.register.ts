import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    displayName?: string;
}