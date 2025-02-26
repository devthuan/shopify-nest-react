import { BaseEntity } from "src/common/base.entity";
import { Categories } from "src/modules/categories/entities/category.entity";
import { Discounts } from "src/modules/discounts/entities/discount.entity";
import { ProductImages } from "src/modules/product_images/entities/product_image.entity";
import { Variants } from "src/modules/variants/entities/variants.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "products"})
export class Products extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Categories, categories => categories.products)
    category: Categories;

    @OneToMany(() => ProductImages, productImages => productImages.products)
    images: ProductImages[];

    @OneToMany(() => Variants, variants => variants.products)
    variants: Variants[];

    @OneToMany(() => Discounts, discounts => discounts.products)
    discounts: Discounts[];


}

