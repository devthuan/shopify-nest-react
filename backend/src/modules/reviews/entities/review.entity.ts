import { BaseEntity } from "src/common/base.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";
import { Products } from "src/modules/products/entities/product.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "reviews"})
export class Reviews extends BaseEntity {

    @Column()
    rating: number;

    @Column()
    comment: string;
    @ManyToOne(() => Products, products => products.reviews)
    products: Products;

    @ManyToOne(() => Accounts, accounts => accounts.reviews)
    accounts: Accounts;

}

