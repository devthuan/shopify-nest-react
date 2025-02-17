import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class EmailDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    

    
}
