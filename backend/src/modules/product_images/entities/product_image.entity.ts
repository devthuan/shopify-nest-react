import { BaseEntity } from "src/common/base.entity";
import { Products } from "src/modules/products/entities/product.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name : "product_images"})
export class ProductImages extends BaseEntity {

    @Column()
    urlImages: string

    @ManyToOne(() => Products, products => products.images)
    products: Products
}
