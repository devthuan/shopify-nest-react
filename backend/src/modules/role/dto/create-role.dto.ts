import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, minLength, MinLength } from "class-validator";


export class CreateRoleDto {

    @IsString({ message: 'Tên phải là chuỗi' })
    name: string;

    @IsString({ message: 'tên code phải là chuỗi' })
    codeName: string;

    @IsString({ message: 'tên bảo vệ phải là chuỗi' })
    guardName: string;


}
