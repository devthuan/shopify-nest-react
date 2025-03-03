import { BaseEntity } from "src/common/base.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { NotificationAccounts } from "./notification-account.entity";

@Entity({name: "notifications"})
export class Notification extends BaseEntity {

    @Column()
    typeSend: string

    @Column()
    title: string

    @Column()
    content: string

    @Column({default: 1})
    isActive: boolean

    @OneToMany(() => NotificationAccounts, notificationAccounts => notificationAccounts.notifications)
    notificationAccounts: NotificationAccounts

    @ManyToOne(() => Accounts, Accounts => Accounts.notifications)
    accounts: Accounts


}
