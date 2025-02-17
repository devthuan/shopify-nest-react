import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class VerifyOtpDto {
    @IsEmail({}, {message: 'Email không đúng định dạng'})
    email: string;

    @IsNotEmpty({message: 'Mã OTP không được để trống'})
    @IsString({message: 'Mã OTP không đúng định dạng'})
    @MinLength(6, {message: 'Mã OTP không đúng định dạng'})
    @MaxLength(6, {message: 'Mã OTP không đúng định dạng'})
    otp: string;

    
}
