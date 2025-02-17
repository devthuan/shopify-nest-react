import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './register.dto';
import { IsString, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateAuthDto  {

    id: string;

    @IsString({message: 'Username phải là chuỗi'})
    @MinLength(5, {message: 'Username tối thiểu 5 ký tự'})
    @MaxLength(50, {message: 'Username tối đa 50 ký tự'})
    userName: string;

    @IsString({message: 'Quyền phải là chuỗi'})
    role: string;
    
}
