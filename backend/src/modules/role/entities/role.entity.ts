import { BaseEntity } from "src/common/base.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity({name: "roles"})
export class Roles extends BaseEntity {
    
    @Column({unique: true})
    name: string;

    @Column({unique: true})
    codeName: string;

    @Column()
    guardName: string;

    @Column({ default: "1"})
    isActive: boolean;

    @OneToMany(() => Accounts, accounts => accounts.role)
    accounts: Accounts;

    
}
