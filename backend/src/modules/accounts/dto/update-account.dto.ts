import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAccountDto   {
    id: string;

    @IsString({message : "Tên người dùng phải là chuỗi"})
    @MinLength(5, {message : "Tên người dùng tối thiểu 5 ký tự"})
    @MaxLength(50, {message : "Tên người dùng tối đa 50 ký tự"})
    userName: string;

    @IsString({message : "Quyền dùng phải là chuỗi"})
    role: string;
}
