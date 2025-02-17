import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: 'Tên phải là chuỗi' })
    name: string;
}
