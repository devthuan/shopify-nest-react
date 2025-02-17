import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/base.entity";
import { Roles } from "src/modules/role/entities/role.entity";
import { Column, Entity, ManyToOne } from "typeorm";

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
}
