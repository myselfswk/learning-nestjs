import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

// dto at like a model as expressjs
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}