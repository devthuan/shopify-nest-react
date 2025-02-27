import { BaseEntity } from "src/common/base.entity";
import { Bills } from "src/modules/bills/entities/bill.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name: 'payments'})
export class Payments extends BaseEntity{

    @Column()
    name: string


    @OneToMany(() => Bills, bills => bills.payments)
    bills: Bills
}

