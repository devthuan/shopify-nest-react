import { BaseEntity } from "src/common/base.entity";
import { Attributes } from "src/modules/attributes/entities/attribute.entity";
import { VariantAttribute } from "src/modules/variant_attributes/entities/variant_attribute.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "attribute_values"})
export class AttributeValues extends BaseEntity {

    @Column()
    value: string;

    @ManyToOne(() => Attributes, attribute => attribute.attribute_values)
    attribute: Attributes;

    @OneToMany(() => VariantAttribute, variant_attribute => variant_attribute.attributeValues)
    variant_attributes: VariantAttribute;

}
