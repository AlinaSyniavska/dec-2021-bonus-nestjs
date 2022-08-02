import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    Matches,
    Max, MaxLength,
    Min, MinLength
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
    @IsString()
    @Length(2, 20)
    @ApiProperty()
    public name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(120)
    @ApiProperty()
    public age: number;

    @IsString()
    @Matches(/^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*/i)
    @ApiProperty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/, {message: 'password too weak'})
    @ApiProperty()
    password: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public workStatus: boolean;
}