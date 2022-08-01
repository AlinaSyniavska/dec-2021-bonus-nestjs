import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/, {message: 'password too weak'})
    password: string;
}