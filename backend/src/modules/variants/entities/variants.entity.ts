import { BaseEntity } from "src/common/base.entity";
import { BillDetails } from "../../../modules/bills/entities/bill-detail.entity";
import { Cart } from "src/modules/carts/entities/cart.entity";
import { Products } from "src/modules/products/entities/product.entity";
import { VariantAttributeValues } from "src/modules/variant-attribute-values/entities/variant-attribute-value.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "variants"})
export class Variants extends BaseEntity{
    
    @Column()
    sku: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @ManyToOne(() => Products, products => products.variants)
    products: Products;

    @OneToMany(() => VariantAttributeValues, variant_attribute => variant_attribute.variant)
    variantAttributeValues: VariantAttributeValues[];

    @OneToMany(() => Cart, carts => carts.variants)
    carts: Cart[];

    @OneToMany(() => BillDetails, billDetails => billDetails.variants)
    billDetails: BillDetails[];

    
   

}
