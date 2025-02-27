import { BaseEntity } from "src/common/base.entity";
import { Products } from "src/modules/products/entities/product.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "discounts"})
export class Discounts extends BaseEntity {

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    quantity: number;

    @Column()
    value: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;


    @ManyToOne(() => Products, products => products.discounts)
    products: Products;

   

   

}

