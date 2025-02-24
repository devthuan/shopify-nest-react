import { Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, MinLength, ValidateNested } from "class-validator";
export class AttributeDto {
    @IsOptional()
    id?: string

    @IsString({ message: 'Tên thuộc tính phải là chuỗi' })
    attributeName: string;

    @IsString({ message: 'Giá trị thuộc tính phải là chuỗi' })
    attributeValue: string;
}

export class VariantDto {

    @IsOptional()
    id?: string

    @IsNumber({}, { message: 'Giá phải là số' })
    @Min(0, { message: 'Giá không thể âm' })
    price: number;

    @IsNumber({}, { message: 'Tồn kho phải là số' })
    @IsPositive({ message: 'Tồn kho phải lớn hơn 0' })
    stock: number;

    @IsArray({ message: 'Danh sách thuộc tính phải là một mảng' })
    @ValidateNested({ each: true })
    @Type(() => AttributeDto)
    attributes: AttributeDto[];
}


export class CreateProductDto {
    @IsString({ message: 'Tên phải là chuỗi' })
    @MinLength(5, { message: 'Tên phải có ít nhất 5 ký tự' })
    name: string;

    @IsString({ message: 'Mô tả phải là chuỗi' })
    @MinLength(10, { message: 'Mô tả phải có ít nhất 10 ký tự' })
    description: string;

    @IsString({ message: 'Mã danh mục phải là chuỗi' })
    categoryId: string

    @IsArray({ message: 'Danh sách url ảnh phải là một mảng' })
   
    images: string[];

    @IsArray({ message: 'Danh sách biến thể phải là một mảng' })
    @ValidateNested({ each: true })
    @Type(() => VariantDto)
    variants: VariantDto[];
}
