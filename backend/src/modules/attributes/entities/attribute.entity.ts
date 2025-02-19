import { BaseEntity } from "src/common/base.entity";
import { AttributeValues } from "src/modules/attribute_values/entities/attribute_value.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "attributes"})
export class Attributes extends BaseEntity {

    @Column()
    name: string;

    @OneToMany(() => AttributeValues, attribute_value => attribute_value.attributes)
    attributeValues: AttributeValues;


}

