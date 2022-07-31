import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    Matches,
    Max,
    Min
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(2, 20)
    public name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(120)
    public age: number;

    @IsString()
    // @IsEmail()
    @Matches(/^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*/i)
    public email: string;

    @IsBoolean()
    @IsOptional()
    public workStatus: boolean;
}