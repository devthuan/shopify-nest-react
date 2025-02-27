import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/base.entity";
import { Bills } from "src/modules/bills/entities/bill.entity";
import { Cart } from "src/modules/carts/entities/cart.entity";
import { Roles } from "src/modules/role/entities/role.entity";
import { UseVouchers } from "src/modules/vouchers/entities/use-voucher.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name: 'accounts'})
export class Accounts extends BaseEntity {
    @Column({unique: true})
    userName: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;
    
    @Column({default: 0})
    balance: number
    
    @Column()
    ip : string
    
    @Column()
    device : string

    @Column()
    typeLogin: string

    @Column()
    isActive: boolean

    @Column({nullable: true})
    lastLogin: Date;

    @ManyToOne(() => Roles, roles => roles.accounts)
    role: Roles;

    @OneToMany(() => UseVouchers, useVouchers => useVouchers.accounts)
    useVouchers: UseVouchers

    @OneToMany(() => Cart, carts => carts.accounts)
    carts: Cart

    @OneToMany(() => Bills, bills => bills.accounts)
    bills: Bills
}
