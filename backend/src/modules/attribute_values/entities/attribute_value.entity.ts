import { BaseEntity } from "src/common/base.entity";
import { Attributes } from "src/modules/attributes/entities/attribute.entity";
import { VariantAttributeValues } from "src/modules/variant-attribute-values/entities/variant-attribute-value.entity";

import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "attribute_values"})
export class AttributeValues extends BaseEntity {

    @Column()
    value: string;

    @ManyToOne(() => Attributes, attribute => attribute.attributeValues)
    attributes: Attributes;

    @OneToMany(() => VariantAttributeValues, variant_attribute => variant_attribute.attributeValues)
    variantAttributeValues: VariantAttributeValues[];

}
