import { BaseEntity } from "src/common/base.entity";
import { AttributeValues } from "src/modules/attribute_values/entities/attribute_value.entity";
import { Variants } from "src/modules/variants/entities/variants.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity({ name: "variant_attributes" })
export class VariantAttribute extends BaseEntity{

    @ManyToOne(() => Variants, variant => variant.variant_attributes)
    variant: Variants;

    @ManyToOne(() => AttributeValues, attributeValues => attributeValues.variant_attributes)
    attributeValues: AttributeValues;
}
