import {IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @IsString()
    @Length(2, 20)
    @IsOptional()
    @ApiProperty()
    public name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(120)
    @IsOptional()
    @ApiProperty()
    public age: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public workStatus: boolean;
}