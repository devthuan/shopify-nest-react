import { BaseEntity } from "src/common/base.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";
import { Variants } from "src/modules/variants/entities/variants.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({name: "carts"})
export class Cart extends BaseEntity {
    
    @Column()
    quantity: number

    @ManyToOne(() => Accounts, accounts => accounts.carts)
    accounts: Accounts;

    @ManyToOne(() => Variants, variants => variants.carts)
    variants: Variants;

}
