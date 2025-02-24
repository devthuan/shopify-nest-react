import { IsNumber, IsString, Min } from "class-validator";

export class CreateCartDto {
    @IsString()
    variantId: string;
    
    @IsNumber()
    @Min(1)
    quantity: number;
    
    accountsId: string;
   
    
   
}

