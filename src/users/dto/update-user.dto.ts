import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

// "?" sign is used for optional fields
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}