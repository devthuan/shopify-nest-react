import { IsString } from "class-validator"

export class CreateVariantAttributeValueDto {
     @IsString({ message: 'variantId phải là chuỗi' })
        variantId: string

    @IsString({ message: 'attributeValueId phải là chuỗi' })
    attributeValueId: string
}
