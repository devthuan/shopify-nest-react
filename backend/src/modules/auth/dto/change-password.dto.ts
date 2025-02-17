import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, minLength, MinLength } from "class-validator";


export class ChangePasswordDto {
    @IsEmail({}, {message: 'Email không đúng định dạng'})
    email: string;

    @IsString({message: 'Mật khẩu không đúng định dạng'})
    @MinLength(6, {message: 'Mật khẩu tối thiểu 6 ký tự'})
    oldPassword: string;

    @IsString({message: 'Mật khẩu không đúng định dạng'})
    @MinLength(6, {message: 'Mật khẩu tối thiểu 6 ký tự'})
    newPassword: string
    
    @IsString({message: 'Mật khẩu không đúng định dạng'})
    @MinLength(6, {message: 'Mật khẩu tối thiểu 6 ký tự'})
    newPasswordConfirm: string


}
