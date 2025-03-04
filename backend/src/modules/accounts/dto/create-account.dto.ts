import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAccountDto {
    @IsEmail({}, {message: "Email không đúng định dạng"})
    email: string;

    @IsString( {message: "Tên người dùng phải là chuỗi"})
    @MinLength(5, {message : "Tên người dùng tối thiểu 5 ký tự"})
    @MaxLength(50, {message : "Tên người dùng tối đa 50 ký tự"})
    username: string;

    @IsString({ message: "Mật khẩu  phải là chuỗi"})
    @MinLength(6, {message : "Mật khẩu  tối thiểu 6 ký tự"})
    password: string;

    @IsString({message: "ConfirmPassword phải là chuỗi"})
    @MinLength(6,  {message: "Mật khẩu xác nhận tối thiểu 6 ký tự"})
    confirmPassword: string;


    @IsString({message: "Quyền phải là chuỗi"})
    role: string;

}
