import { BaseEntity } from "src/common/base.entity";
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
    product: Products;

    @OneToMany(() => VariantAttributeValues, variant_attribute => variant_attribute.variant)
    variantAttributeValues: VariantAttributeValues[];

    
   

}
