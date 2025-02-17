import { IsString } from "class-validator";

export class CreateAttributeDto {
    @IsString({ message: 'Tên phải là chuỗi' })
    name: string;
}
