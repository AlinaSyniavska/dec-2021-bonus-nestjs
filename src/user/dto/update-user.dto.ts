import {IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @Length(2, 20)
    @IsOptional()
    public name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(120)
    @IsOptional()
    public age: number;

    @IsBoolean()
    @IsOptional()
    public workStatus: boolean;
}