import { IsEmail, IsIP, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";


export class LoginDto {
   
    @ValidateIf(o => !o.username)  // Nếu không có username thì email là bắt buộc
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @ValidateIf(o => !o.email)     // Nếu không có email thì username là bắt buộc
    @IsString()
    @MinLength(5, { message: 'Username tối thiểu 5 ký tự' })
    username: string;

    @IsString()
    @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
    password: string;

    @IsIP()
    @IsString()
    ip: string;


    
}
