import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Vouchers } from "./voucher.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";

@Entity({name: "useVouchers"})
export class UseVouchers extends BaseEntity {

    @Column()
    usingDate: Date;

    @ManyToOne(() => Accounts,  accounts => accounts.useVouchers)
    accounts: Accounts;

    @ManyToOne(() => Vouchers,  vouchers => vouchers.useVouchers)
    vouchers: Vouchers;

}
