import { BaseEntity } from "src/common/base.entity";
import { Products } from "src/modules/products/entities/product.entity";
import {  Column, Entity, OneToMany } from "typeorm";

@Entity({name: "categories"})
export class Categories extends BaseEntity {

    @Column()
    name: string;

    @OneToMany(() => Products, products => products.category)
    products: Products[];

}

