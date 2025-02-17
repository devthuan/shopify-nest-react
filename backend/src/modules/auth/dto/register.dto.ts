import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";


export class CreateAuthDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsString({ message: 'Username phải là chuỗi' })
    @MinLength(5, { message: 'Username tối thiểu 5 ký tự' })
    @MaxLength(50, { message: 'Username tối đa 50 ký tự' })
    username: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @MinLength(6)
    password: string;

    @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
    @IsString({ message: 'Xác nhận mật khẩu phải là chuỗi' })
    @MinLength(6, { message: 'Xác nhận mật khẩu tối thiểu 6 ký tự' })
    @MaxLength(25, { message: 'Xác nhận mật khẩu tối đa 25 ký tự' })
    confirmPassword: string;


    @IsOptional()
    role: string;

    
}
