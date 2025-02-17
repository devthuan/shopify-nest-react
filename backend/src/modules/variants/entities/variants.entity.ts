import { BaseEntity } from "src/common/base.entity";
import { Products } from "src/modules/products/entities/product.entity";
import { VariantAttribute } from "src/modules/variant_attributes/entities/variant_attribute.entity";
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

    @OneToMany(() => VariantAttribute, variant_attribute => variant_attribute.variant)
    variant_attributes: VariantAttribute;

    
   

}
