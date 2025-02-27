import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationAccounts } from './entities/notification-account.entity';
import { RoleModule } from '../role/role.module';
import { Accounts } from '../auth/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationAccounts, Accounts]),
    RoleModule
  ],
  exports: [NotificationsService],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
