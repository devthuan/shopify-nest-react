import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";



export class BillDetailDto {
    @IsString( {message: 'productVariantId phải là ký tự'} )
    productVariantId: string;
    

    @IsNumber({}, {message: 'quantity phải là số'})
    @Min(1, {message: 'quantity phải lớn hơn hoặc bằng 1'})
    quantity: number;
 
}


export class CreateBillDto {
    @IsOptional()
    voucher: string;
    
    totalPrice: number;

    status: string = 'pending';

    @IsString({message: 'fullName phải là ký tự'})
    fullName: string;

    @IsString({message: 'deliverAddress phải là ký tự'})
    deliverAddress: string;
    
    @IsString({message: 'deliverPhone phải là ký tự'})
    deliverPhone: string;

    @IsString({message: 'shippingMethod phải là ký tự'})
    shippingMethod: string;

    @IsString({message: 'paymentMethod phải là ký tự'})
    paymentMethod: string;

    @IsOptional()
    note: string;

    @IsArray({message: 'products phải là mảng'})
    @ValidateNested({each: true})
    @Type(() => BillDetailDto)
    products: BillDetailDto[]

    accountId: string;


}
