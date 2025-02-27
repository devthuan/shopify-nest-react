import { BaseEntity } from "src/common/base.entity";
import {  Column, Entity, ManyToOne } from "typeorm";
import { Notification } from "./notification.entity";
import { Accounts } from "src/modules/auth/entities/account.entity";

@Entity({name: "notificationAccounts"})
export class NotificationAccounts extends BaseEntity {

    @Column({default: 0})
    isRead: boolean;

    @ManyToOne(() => Notification, notification => notification.notificationAccounts)
    notifications: Notification;

    @ManyToOne(() => Accounts, accounts => accounts.notificationAccounts)
    accounts: Accounts

}
