import { IsString } from "class-validator";

export class CreateAttributeValueDto {
    @IsString({ message: 'Giá trị phải là chuỗi' })
    value: string;

    @IsString({ message: 'attributeId phải là chuỗi' })
    attributeId: string
}
