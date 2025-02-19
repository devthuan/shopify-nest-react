import { BaseEntity } from "src/common/base.entity";
import { Categories } from "src/modules/categories/entities/category.entity";
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

    @OneToMany(() => Variants, variants => variants.product)
    variants: Variants[];


}

