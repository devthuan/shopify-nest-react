import { BaseEntity } from "src/common/base.entity";
import { AttributeValues } from "src/modules/attribute_values/entities/attribute_value.entity";
import { Variants } from "src/modules/variants/entities/variants.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity({ name: "variantAttributeValues" })
export class VariantAttributeValues extends BaseEntity{

    @ManyToOne(() => Variants, variant => variant.variantAttributeValues, { onDelete: 'CASCADE'})
    variant: Variants;

    @ManyToOne(() => AttributeValues, attributeValues => attributeValues.variantAttributeValues, { onDelete: 'CASCADE'})
    attributeValues: AttributeValues;
}
