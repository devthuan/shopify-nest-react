import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Bills } from "./bill.entity";
import { Variants } from "src/modules/variants/entities/variants.entity";

@Entity({name: "billDetail"})
export class BillDetails extends BaseEntity {

    @Column()
    quantity: number

    @Column()
    price: number

    @Column()
    discount: number

    @ManyToOne(() => Bills, bills => bills.billDetails)
    bills: Bills;

    @ManyToOne(() => Variants, variants => variants.billDetails)
    variants: Variants;

}