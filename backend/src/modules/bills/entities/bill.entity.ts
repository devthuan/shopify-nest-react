import { BaseEntity } from "src/common/base.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";
import { Vouchers } from "src/modules/vouchers/entities/voucher.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BillDetails } from "./bill-detail.entity";
import { Payments } from "src/modules/payments/entities/payment.entity";

@Entity({name: "bills"})
export class Bills extends BaseEntity{
    @Column()
    status: string

    @Column()
    total: number;

    @Column()
    totalDiscount: number
    
    @Column()
    totalPayment: number;
    
    @Column()
    fullName: string

    @Column()
    deliverAddress: string;
    
    @Column()
    deliverPhone: string;

    @Column()
    shippingMethod: string;

    @Column()
    note: string;

    @ManyToOne(() => Accounts, accounts => accounts.bills)
    accounts: Accounts;

    @ManyToOne(() => Payments, payments => payments.bills)
    payments: Payments;

    @ManyToOne(() => Vouchers, vouchers => vouchers.bills)
    vouchers: Vouchers;

    @OneToMany(()=> BillDetails, billDetails => billDetails.bills)
    billDetails: BillDetails[]


   
}
